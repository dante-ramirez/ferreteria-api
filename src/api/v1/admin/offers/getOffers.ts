import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import _Offer from '../../../../entities/Offer';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database
  } = req;

  let offers: _Offer[];

  try {
    offers = await database.offers.get();
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'OFFERS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send({
    items: offers.map((offer) => offer.serialize())
  });
}
