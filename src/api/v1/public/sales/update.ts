import { ItemNotFound } from '../../../../database/errors';
import _Sale from '../../../../entities/sale';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    code,
    date,
    total,
    subtotal
  } = body;
  const { id } = params;

  let saleToUpdate: _Sale;

  try {
    saleToUpdate = await database.sales.getById(Number(id));
    saleToUpdate.code = code;
    saleToUpdate.date = date;
    saleToUpdate.total = total;
    saleToUpdate.subtotal = subtotal;

    await database.sales.update(saleToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(saleToUpdate.serialize());
}
