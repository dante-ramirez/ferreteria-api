import { ItemNotFound } from '../../../../database/errors';
import _Invoice from '../../../../entities/Invoice';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    invoiceId
  } = params;

  let invoiceToDelete: _Invoice;

  try {
    invoiceToDelete = await database.invoice.getByID(Number(invoiceId));
    await database.invoice.delete(Number(invoiceToDelete.id));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INVOICE_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send();
}
