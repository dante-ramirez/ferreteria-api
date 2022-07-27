import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Favorite from '../../../../entities/Favorite';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    user,
    body
  } = req;
  const {
    // eslint-disable-next-line camelcase
    product_id
  } = body;

  let favorite = new Favorite(
    0,
    user.id,
    product_id
  );

  try {
    favorite = await database.favorite.create(favorite);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'FAVORITE_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(favorite.serialize());
}
