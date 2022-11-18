import { ItemNotFound } from '../../../../database/errors';
import _IndividualOffer from '../../../../entities/IndividualOffer';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    offersId,
    beginAt,
    finishAt
  } = body;
  const { id } = params;

  let individualOfferToUpdate: _IndividualOffer;

  try {
    individualOfferToUpdate = await database.individualOffers.getById(Number(id));
    individualOfferToUpdate.offersId = offersId;
    individualOfferToUpdate.beginAt = beginAt;
    individualOfferToUpdate.finishAt = finishAt;

    await database.individualOffers.update(individualOfferToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(individualOfferToUpdate.serialize());
}
