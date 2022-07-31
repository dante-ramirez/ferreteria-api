/* eslint-disable camelcase */
import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import SaleDetail from '../../../../entities/saleDetail';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    amount,
    sale_price,
    sales_id,
    product_id
  } = body;

  let saleDetail = new SaleDetail(
    0,
    amount,
    sale_price,
    sales_id,
    product_id
  );

  try {
    saleDetail = await database.saleDetail.create(saleDetail);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'SALE_DETAIL_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ amount: errorCode });
  }

  return res.status(201).send(saleDetail.serialize());
}
