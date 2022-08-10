import { ItemNotFound } from '../../../../database/errors';
import _Product from '../../../../entities/Product';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    productId
  } = params;

  let productToDelete: _Product;

  try {
    productToDelete = await database.product.getByID(Number(productId));
    await database.product.delete(Number(productToDelete.id));
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

  return res.status(200).send();
}
