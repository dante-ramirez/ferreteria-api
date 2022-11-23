import Invoice from '../../../../entities/Invoice';
import User from '../../../../entities/User';
import { ItemAlreadyExist, ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import mailingService from '../../../../mailing-service';
import { MailParams } from '../../../../mailing-service/interfaces';
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

  let user: User;
  let mailParams: MailParams;

  try {
    user = await database.users.getById(userId);

    mailParams = {
      receiverName: `${user.name} ${user.lastName}`,
      receivers: [user.email],
      attachments: [{
        filename,
        path
      }]
    };

    await mailingService.sendInvoice(mailParams);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USER_WAS_NOT_FOUND';
    }

    await database.invoices.delete(Number(invoice.id));
    _file.delete('uploads/invoices/', filename);

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send({
    statusText: 'Success',
    mail: `Invoice sended to ${user.email}.`,
    file: {
      filename,
      destination,
      path
    },
    invoice: invoice.serialize()
  });
}
