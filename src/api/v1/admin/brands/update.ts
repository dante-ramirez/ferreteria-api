/* eslint-disable camelcase */
import { ItemNotFound } from '../../../../database/errors';
import _Brand from '../../../../entities/Brand';
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
    offersId,
    beginAt,
    finishAt
  } = body;
  const { id } = params;

  let brandToUpdate: _Brand;

  try {
    brandToUpdate = await database.brands.getById(Number(id));
    brandToUpdate.name = name;
    brandToUpdate.offersId = offersId;
    brandToUpdate.beginAt = beginAt;
    brandToUpdate.finishAt = finishAt;

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
