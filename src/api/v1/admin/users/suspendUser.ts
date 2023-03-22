import { ItemNotFound } from '../../../../database/errors';
import _User from '../../../../entities/User';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params,
    query
  } = req;
  const {
    userId
  } = params;
  const {
    isSuspended = false
  } = query;

  let user: _User;

  try {
    user = await database.users.suspend(Number(userId), isSuspended);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(user.serialize());
}
