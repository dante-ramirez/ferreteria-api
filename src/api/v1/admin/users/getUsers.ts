import { ItemNotFound } from '../../../../database/errors';
import { UsersFilters as _UsersFilters } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _User from '../../../../entities/User';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    lastName = '',
    perPage = 0,
    currentPage = 0,
    order = ''
  } = query;

  let users: _User[];
  let totalCount: number = 0;

  try {
    const filters: _UsersFilters = {
      name: {
        value: name,
        type: 'like',
        order
      },
      lastName: {
        value: lastName,
        type: 'like',
        order
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    users = await database.users.get(filters, pagination);
    totalCount = await database.users.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USERS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const usersSerialized = users.map((user) => user.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: usersSerialized,
    pagination: paginationResult
  });
}
