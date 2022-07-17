import { ItemNotFound } from '../../../../database/errors';
import { OffersFilter as _OffersFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Offer from '../../../../entities/Offer';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    perPage = 0,
    currentPage = 0
  } = query;

  let offers: _Offer[];
  let TotalCount: number = 0;

  try {
    const filters: _OffersFilter = {
      name: {
        value: name,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    offers = await database.offers.get(filters, pagination);
    TotalCount = await database.offers.count(filters);
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

  const offersSerialized = offers.map((offer) => offer.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: offersSerialized,
    pagination: paginationResult
  });
}
