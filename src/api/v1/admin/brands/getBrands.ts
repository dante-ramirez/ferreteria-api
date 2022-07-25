import { ItemNotFound } from '../../../../database/errors';
import { BrandsFilter as _BrandsFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Brand from '../../../../entities/Brand';
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

  let brands: _Brand[];
  let brandsTotalCount: number = 0;

  try {
    const filters: _BrandsFilter = {
      name: {
        value: name,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    brands = await database.brands.get(filters, pagination);
    brandsTotalCount = await database.brands.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'BRANDS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const brandsSerialized = brands.map((brand) => brand.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: brandsTotalCount
  };

  return res.status(200).send({
    items: brandsSerialized,
    pagination: paginationResult
  });
}
