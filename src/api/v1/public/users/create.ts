import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import User from '../../../../entities/User';
import Wallet from '../../../../entities/Wallet';
import passwordHelper from '../../../../helpers/passwords';
import mailingService from '../../../../mailing-service';
import jwt from '../../../../entities/jwt';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    name,
    lastName,
    email,
    password
  } = body;

  let user = new User(
    0,
    name,
    lastName,
    email.toLowerCase(),
    passwordHelper.hash(password),
    'client',
    false,
    false,
    new Wallet(0, 0, 0, 0)
  );

  try {
    user = await database.users.create(user);
    user.wallet.userId = user.id;

    const mailParams = {
      receivers: [user.email],
      attachments: [],
      receiverName: `${user.name} ${user.lastName}`
    };
    const token = jwt.createAccountVerificationToken({ id: user.id });

    await mailingService.sendAccountVerificationToken(mailParams, token);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'USER_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  try {
    await database.wallets.create(user.wallet);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'WALLET_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(user.serialize());
}
