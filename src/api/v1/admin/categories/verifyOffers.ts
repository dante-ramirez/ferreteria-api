import Category from '../../../../entities/Category';
import Product from '../../../../entities/Product';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let categories: Category[];
  let products: Product[];
  const offersUpdated: Category[] = [];
  const productsUpdated: Product[] = [];
  const currentDate = new Date();

  try {
    categories = await database.categories.getAllWithOffers();

    await Promise.all(categories.map(async (category) => {
      if (Date.parse(category.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(category.finishAt)) {
        const categoryToUpdate = new Category(
          category.id,
          category.name,
          1,
          category.beginAt,
          category.finishAt
        );

        const offerUpdated = await database.categories.update(categoryToUpdate);
        offersUpdated.push(offerUpdated);

        const discount = category.offersId - 1;

        try {
          products = await database.products.getByForeignId('category_id', category.id);

          await Promise.all(products.map(async (product) => {
            const saving = product.price - product.finalPrice;
            let percent = ((saving * 100) / product.price) - discount;

            if (percent >= 1) {
              percent /= 100;
            }

            const productTemp = product;
            productTemp.finalPrice = product.price - (product.price * percent);

            if (productTemp.finalPrice !== product.finalPrice) {
              try {
                const productUpdated = await database.products.update(productTemp);

                productsUpdated.push(productUpdated);
              } catch (error) {
                let errorCode = 'UNEXPECTED_ERROR';
                let statusCode = 500;

                if (error instanceof ItemNotFound) {
                  statusCode = 404;
                  errorCode = 'PRODUCT_WAS_NOT_FOUND';
                }

                logger.log(error);
                return res.status(statusCode).send({ code: errorCode });
              }
            }

            return productsUpdated;
          }));
        } catch (error) {
          throw error;
        }
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'CATEGORIES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((category) => category.serialize()));
}
