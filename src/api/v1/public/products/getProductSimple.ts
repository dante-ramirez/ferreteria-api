import Product from '../../../../entities/Product';
import ProductDiscountSimple from '../../../../entities/ProductDiscountSimple';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const {
    database,
    params
  } = req;
  const {
    productId
  } = params;

  let product: Product;

  try {
    product = await database.products.getById(Number(productId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PRODUCT_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const saving = product.price - product.finalPrice;
  const percent = (saving * 100) / product.price;

  const productDiscount = new ProductDiscountSimple(
    product,
    saving,
    percent
  );

  return res.status(200).send(productDiscount.serialize());
}
