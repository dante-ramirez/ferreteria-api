import { ItemNotFound } from '../../../../database/errors';
import _Wallet from '../../../../entities/Wallet';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    user
  } = req;

  let wallet: _Wallet;

  try {
    wallet = await database.wallet.getByUserId(Number(user.id));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'WALLET_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(wallet.serialize());
}
