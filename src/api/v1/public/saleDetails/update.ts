/* eslint-disable camelcase */
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
    sale_price,
    sales_id,
    product_id
  } = body;
  const { id } = params;

  let saleDetailToUpdate: _SaleDetail;

  try {
    saleDetailToUpdate = await database.saleDetail.getByID(Number(id));
    saleDetailToUpdate.amount = amount;
    saleDetailToUpdate.sale_price = sale_price;
    saleDetailToUpdate.sales_id = sales_id;
    saleDetailToUpdate.product_id = product_id;

    await database.saleDetail.update(saleDetailToUpdate);
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
