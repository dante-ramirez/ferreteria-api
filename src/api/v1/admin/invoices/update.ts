import { ItemNotFound } from '../../../../database/errors';
import _Invoice from '../../../../entities/Invoice';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    user,
    body,
    params
  } = req;
  const {
    path
  } = body;
  const { id } = params;

  let invoice: _Invoice;

  try {
    invoice = await database.invoice.getByID(Number(id));
    invoice.path = path;
    invoice.userId = user.id;

    await database.invoice.update(invoice);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INVOICE_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(invoice.serialize());
}
