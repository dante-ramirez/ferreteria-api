/* eslint-disable camelcase */
import { ItemNotFound } from '../../../../database/errors';
import { FavoritesFilter as _FavoritesFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Favorite from '../../../../entities/Favorite';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    user_id = 0,
    perPage = 0,
    currentPage = 0
  } = query;

  let favorites: _Favorite[];
  let TotalCount: number = 0;

  try {
    const filters: _FavoritesFilter = {
      user_id: {
        value: user_id,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    favorites = await database.favorite.get(filters, pagination);
    TotalCount = await database.favorite.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'FAVORITES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const favoritesSerialized = favorites.map((favorite) => favorite.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: favoritesSerialized,
    pagination: paginationResult
  });
}
