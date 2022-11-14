import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import _IndividualOffer from '../../../../entities/IndividualOffer';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database
  } = req;

  let individualOffers: _IndividualOffer[];

  try {
    individualOffers = await database.individualOffers.get();
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFERS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send({
    items: individualOffers.map((individualOffer) => individualOffer.serialize())
  });
}
