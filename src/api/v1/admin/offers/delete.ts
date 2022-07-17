import { ItemNotFound } from '../../../../database/errors';
import _Offer from '../../../../entities/Offer';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    offerId
  } = params;

  let offerToDelete: _Offer;

  try {
    offerToDelete = await database.offers.getByID(Number(offerId));
    await database.offers.delete(Number(offerToDelete.id));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'OFFER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send();
}
