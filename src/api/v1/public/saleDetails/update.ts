import { ItemNotFound } from '../../../../database/errors';
import _SaleDetail from '../../../../entities/SaleDetail';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    salesId,
    productId,
    salePrice,
    quantity,
    amount
  } = body;
  const { id } = params;

  let saleDetailToUpdate: _SaleDetail;

  try {
    saleDetailToUpdate = await database.saleDetails.getById(Number(id));

    saleDetailToUpdate.salesId = salesId;
    saleDetailToUpdate.productId = productId;
    saleDetailToUpdate.salePrice = salePrice;
    saleDetailToUpdate.quantity = quantity;
    saleDetailToUpdate.amount = amount;

    await database.saleDetails.update(saleDetailToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_DETAIL_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ amount: errorCode });
  }

  return res.status(200).send(saleDetailToUpdate.serialize());
}
