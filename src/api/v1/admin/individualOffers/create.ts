import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import IndividualOffer from '../../../../entities/IndividualOffer';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    offersId,
    beginAt,
    finishAt
  } = body;

  let individualOffer = new IndividualOffer(
    0,
    offersId,
    beginAt,
    finishAt
  );

  try {
    individualOffer = await database.individualOffers.create(individualOffer);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'INDIVIDUAL_OFFER_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(individualOffer.serialize());
}
