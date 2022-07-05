import { ItemNotFound } from '../../../../database/errors';
import _Brand from '../../../../entities/brands';
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
  let brandToUpdate: _Brand;

  try {
    brandToUpdate = await database.brands.getByID(Number(id));
    brandToUpdate.name = name;
    brandToUpdate.discount = discount;

    await database.brands.update(brandToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'BRAND_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(brandToUpdate.serialize());
}
