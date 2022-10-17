import { ItemNotFound } from '../../../../database/errors';
import Invoice from '../../../../entities/Invoice';
import Request from '../../../../definitions/request';
import file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req:Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    invoiceId
  } = params;

  let invoiceToDelete: Invoice;

  try {
    invoiceToDelete = await database.invoices.getById(Number(invoiceId));
    await database.invoices.delete(Number(invoiceToDelete.id));
    file.delete('uploads/invoices/', invoiceToDelete.filename);
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

  return res.status(200).send({
    statusText: 'Success',
    message: `File with name '${invoiceToDelete.filename}' deleted successfully`
  });
}
