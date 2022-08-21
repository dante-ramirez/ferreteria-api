import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Wallet from '../../../../entities/Wallet';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    user,
    body
  } = req;
  const {
    amount
  } = body;

  let wallet = new Wallet(
    0,
    amount,
    user.id
  );

  try {
    wallet = await database.wallets.create(wallet);
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

  return res.status(201).send(wallet.serialize());
}
