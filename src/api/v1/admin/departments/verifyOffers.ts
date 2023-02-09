import Department from '../../../../entities/Department';
import Product from '../../../../entities/Product';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let departments: Department[];
  let products: Product[];
  const offersUpdated: Department[] = [];
  const productsUpdated: Product[] = [];
  const currentDate = new Date();

  try {
    departments = await database.departments.getAllWithOffers();

    await Promise.all(departments.map(async (department) => {
      if (Date.parse(department.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(department.finishAt)) {
        const departmentToUpdate = new Department(
          department.id,
          department.name,
          1,
          department.beginAt,
          department.finishAt
        );

        const offerUpdated = await database.departments.update(departmentToUpdate);
        offersUpdated.push(offerUpdated);

        const discount = department.offersId - 1;

        try {
          products = await database.products.getByForeignId('department_id', department.id);

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
      errorCode = 'DEPARTMENTS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((department) => department.serialize()));
}
