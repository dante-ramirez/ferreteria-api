import { ItemNotFound } from '../../../../database/errors';
import _SaleDetail from '../../../../entities/saleDetail';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    amount,
    salePrice,
    salesId,
    productId
  } = body;
  const { id } = params;

  let saleDetailToUpdate: _SaleDetail;

  try {
    saleDetailToUpdate = await database.saleDetails.getById(Number(id));
    saleDetailToUpdate.amount = amount;
    saleDetailToUpdate.sale_price = salePrice;
    saleDetailToUpdate.sales_id = salesId;
    saleDetailToUpdate.product_id = productId;

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
