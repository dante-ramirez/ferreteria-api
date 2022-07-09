import { ItemNotFound } from '../../../../database/errors';
import _Wallet from '../../../../entities/Wallet';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    user,
    body
  } = req;
  const {
    amount
  } = body;

  let wallet: _Wallet;

  try {
    wallet = await database.wallet.getByUserId(user.id);

    wallet.amount = amount;

    await database.wallet.update(wallet);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'WALLET_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(wallet.serialize());
}
