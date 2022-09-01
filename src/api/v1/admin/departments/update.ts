/* eslint-disable camelcase */
import { ItemNotFound } from '../../../../database/errors';
import _Department from '../../../../entities/Department';
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

  let departmentToUpdate: _Department;

  try {
    departmentToUpdate = await database.departments.getById(Number(id));
    departmentToUpdate.name = name;
    departmentToUpdate.offersId = offersId;
    departmentToUpdate.beginAt = beginAt;
    departmentToUpdate.finishAt = finishAt;

    await database.departments.update(departmentToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'DEPARTMENT_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(departmentToUpdate.serialize());
}
