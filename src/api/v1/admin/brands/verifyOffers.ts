import Brand from '../../../../entities/Brand';
import Product from '../../../../entities/Product';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let brands: Brand[];
  let products: Product[];
  const offersUpdated: Brand[] = [];
  const productsUpdated: Product[] = [];
  const currentDate = new Date();

  try {
    brands = await database.brands.getAllWithOffers();

    await Promise.all(brands.map(async (brand) => {
      if (Date.parse(brand.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(brand.finishAt)) {
        const brandToUpdate = new Brand(
          brand.id,
          brand.name,
          1,
          brand.beginAt,
          brand.finishAt
        );

        const offerUpdated = await database.brands.update(brandToUpdate);
        offersUpdated.push(offerUpdated);

        const discount = brand.offersId - 1;

        try {
          products = await database.products.getByForeignId('brand_id', brand.id);

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
      errorCode = 'BRANDS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((brand) => brand.serialize()));
}
