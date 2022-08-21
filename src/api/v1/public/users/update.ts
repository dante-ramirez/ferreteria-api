import { ItemNotFound } from '../../../../database/errors';
import _User from '../../../../entities/User';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';
import passwordHelper from '../../../../helpers/passwords';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    user
  } = req;
  const {
    name,
    lastName,
    password
  } = body;

  let userToUpdate: _User;

  try {
    userToUpdate = await database.users.getById(user.id);

    userToUpdate.name = name;
    userToUpdate.lastName = lastName;
    userToUpdate.password = passwordHelper.hash(password);

    await database.users.update(userToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(userToUpdate.serialize());
}
