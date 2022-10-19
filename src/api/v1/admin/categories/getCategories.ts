import { ItemNotFound } from '../../../../database/errors';
import { CategoriesFilter as _CategoriesFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Category from '../../../../entities/Category';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    perPage = 0,
    currentPage = 0,
    orderBy = ''
  } = query;

  let categories: _Category[];
  let totalCount: number = 0;

  try {
    const filters: _CategoriesFilter = {
      name: {
        value: name,
        type: 'like',
        order: orderBy
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    categories = await database.categories.get(filters, pagination);
    totalCount = await database.categories.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'CATEGORIES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const categoriesSerialized = categories.map((category) => category.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: categoriesSerialized,
    pagination: paginationResult
  });
}
