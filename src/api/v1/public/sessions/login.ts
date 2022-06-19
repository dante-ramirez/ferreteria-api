import { ItemNotFound } from '../../../../database/errors';
import _User from '../../../../entities/User';
import _Request from '../../../../definitions/request';
import passwordHelper from '../../../../helpers/passwords';
import jwt from '../../../../entities/jwt';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body
  } = req;
  const {
    email,
    password
  } = body;

  let token:any;
  let user: _User;

  try {
    user = await database.users.getByEmail(email.toLowerCase());
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 401;
      errorCode = 'INVALID_CREDENTIALS';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  if (await passwordHelper.isPasswordCorrect(password, user.password)) {
    token = jwt.createSessionToken({ id: user.id, email: email.toLowerCase(), role: user.role });
  } else {
    return res.status(401).send({ code: 'INVALID_CREDENTIALS' });
  }

  return res.status(200).send(token);
}
