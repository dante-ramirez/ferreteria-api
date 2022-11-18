import IndividualOffer from '../../../../entities/IndividualOffer';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let individualOffers: IndividualOffer[];
  const offersUpdated: IndividualOffer[] = [];
  const currentDate = new Date();

  try {
    individualOffers = await database.individualOffers.getAllWithOffers();

    await Promise.all(individualOffers.map(async (individualOffer) => {
      if (Date.parse(individualOffer.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(individualOffer.finishAt)) {
        const individualOfferToUpdate = new IndividualOffer(
          individualOffer.id,
          1,
          individualOffer.beginAt,
          individualOffer.finishAt
        );

        const offerUpdated = await database.individualOffers.update(individualOfferToUpdate);
        offersUpdated.push(offerUpdated);
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFERS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((individualOffer) => individualOffer.serialize()));
}
