import { ItemNotFound } from '../../../../database/errors';
import _User from '../../../../entities/User';
import _Request from '../../../../definitions/request';
import mailingService from '../../../../mailing-service';
import jwt from '../../../../entities/jwt';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    email
  } = body;

  let userToVerify: _User;
  let mailParams: any;
  let token: any;

  try {
    userToVerify = await database.users.getByEmail(email.toLowerCase());

    mailParams = {
      receivers: [userToVerify.email],
      attachments: [],
      receiverName: `${userToVerify.name} ${userToVerify.lastName}`
    };
    token = jwt.createAccountVerificationToken({ id: userToVerify.id });

    await mailingService.sendAccountVerificationToken(mailParams, token);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send();
}
