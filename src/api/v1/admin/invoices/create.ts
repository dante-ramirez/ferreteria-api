import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Invoice from '../../../../entities/Invoice';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    user,
    body
  } = req;
  const {
    path,
    salesId
  } = body;

  let invoice = new Invoice(
    0,
    path,
    user.id,
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

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(invoice.serialize());
}
