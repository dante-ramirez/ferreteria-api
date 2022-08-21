import { ItemNotFound } from '../../../../database/errors';
import _Offer from '../../../../entities/Offer';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    name,
    discount,
    type,
    finishAt
  } = body;
  const { id } = params;

  let offerToUpdate: _Offer;

  try {
    offerToUpdate = await database.offers.getById(Number(id));
    offerToUpdate.name = name;
    offerToUpdate.discount = discount;
    offerToUpdate.type = type;
    offerToUpdate.finishAt = finishAt;

    await database.offers.update(offerToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'OFFER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offerToUpdate.serialize());
}
