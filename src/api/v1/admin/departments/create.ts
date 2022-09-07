import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Department from '../../../../entities/Department';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    name,
    offersId,
    beginAt,
    finishAt
  } = body;

  let department = new Department(
    0,
    name,
    offersId,
    beginAt,
    finishAt
  );

  try {
    department = await database.departments.create(department);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'DEPARTMENT_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(department.serialize());
}
