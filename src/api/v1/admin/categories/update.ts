import { ItemNotFound } from '../../../../database/errors';
import _Category from '../../../../entities/Category';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    name,
    discount
  } = body;
  const { id } = params;

  let categoryToUpdate: _Category;

  try {
    categoryToUpdate = await database.categories.getById(Number(id));
    categoryToUpdate.name = name;
    categoryToUpdate.discount = discount;

    await database.categories.update(categoryToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'CATEGORY_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(categoryToUpdate.serialize());
}
