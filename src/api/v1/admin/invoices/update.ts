import { ItemNotFound } from '../../../../database/errors';
import Invoice from '../../../../entities/Invoice';
import Request from '../../../../definitions/request';
import _file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req:Request, res:any) {
  const { database, file, params } = req;
  const { filename, destination, path } = file;
  const { id } = params;

  let invoice: Invoice;
  let oldFileName: string;

  try {
    invoice = await database.invoices.getById(Number(id));

    oldFileName = invoice.filename;
    invoice.filename = filename;

    _file.delete('uploads/invoices/', oldFileName);
    await database.invoices.update(invoice);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INVOICE_WAS_NOT_FOUND';
    }

    _file.delete('uploads/invoices/', filename);

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send({
    statusText: 'Success', filename, destination, path, invoice: invoice.serialize()
  });
}
