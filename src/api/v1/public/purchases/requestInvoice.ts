import { ItemNotFound } from '../../../../database/errors';
import _Sale from '../../../../entities/Sale';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;

  const { salesId } = params;

  let sale: _Sale;

  try {
    sale = await database.sales.getById(Number(salesId));
    sale.request = true;

    sale = await database.sales.update(sale);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(sale.serialize());
}
