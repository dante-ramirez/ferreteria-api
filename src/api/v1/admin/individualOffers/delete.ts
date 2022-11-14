import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    individualOfferId
  } = params;

  try {
    await database.individualOffers.delete(Number(individualOfferId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';
    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFER_WAS_NOT_FOUND';
    }
    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }
  return res.status(200).send();
}
