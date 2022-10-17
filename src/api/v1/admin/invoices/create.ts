import Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Invoice from '../../../../entities/Invoice';
import _file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database, body, file } = req;
  const { userId, salesId } = body;
  const { filename, destination, path } = file;

  let invoice = new Invoice(
    0,
    filename,
    userId,
    salesId
  );

  try {
    invoice = await database.invoices.create(invoice);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'INVOICE_ALREADY_EXIST';
    }

    _file.delete('uploads/invoices/', filename);

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send({
    statusText: 'Success', filename, destination, path, invoice: invoice.serialize()
  });
}
