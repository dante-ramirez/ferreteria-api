import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import SaleDetail from '../../../../entities/SaleDetail';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    salesId,
    productId,
    salePrice,
    quantity,
    amount
  } = body;

  let saleDetail = new SaleDetail(
    0,
    salesId,
    productId,
    salePrice,
    quantity,
    amount
  );

  try {
    saleDetail = await database.saleDetails.create(saleDetail);
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
