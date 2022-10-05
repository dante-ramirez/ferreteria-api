import { ItemNotFound } from '../../../../database/errors';
import _Wallet from '../../../../entities/Wallet';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database
  } = req;

  let wallets: _Wallet[];
  const walletsUpdated: _Wallet[] = [];

  try {
    wallets = await database.wallets.get();

    await Promise.all(wallets.map(async (wallet) => {
      const walletToUpdate = new _Wallet(
        wallet.id,
        wallet.userId,
        wallet.points + wallet.unavailablePoints,
        wallet.unavailablePoints - wallet.unavailablePoints
      );

      const walletUpdated = await database.wallets.enablePoints(walletToUpdate);
      walletsUpdated.push(walletUpdated);
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'WALLETS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(walletsUpdated.map((wallet) => wallet.serialize()));
}
