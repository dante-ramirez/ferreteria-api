import { ItemNotFound } from '../../../../database/errors';
import { FavoritesFilter as _FavoritesFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _FavoriteProduct from '../../../../entities/FavoriteProduct';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query,
    user
  } = req;
  const {
    perPage = 0,
    currentPage = 0
  } = query;

  let favorites: _FavoriteProduct[];
  let totalCount: number = 0;

  try {
    const filters: _FavoritesFilter = {
      userId: {
        value: user.id,
        type: 'match'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    favorites = await database.favorites.get(filters, pagination);
    totalCount = await database.favorites.count(filters);
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
    totalItems: totalCount
  };

  return res.status(200).send({
    items: favoritesSerialized,
    pagination: paginationResult
  });
}
