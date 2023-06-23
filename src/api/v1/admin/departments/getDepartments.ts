import { ItemNotFound } from '../../../../database/errors';
import { DepartmentsFilter as _DepartmentsFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Department from '../../../../entities/Department';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    perPage = 0,
    currentPage = 0,
    order = ''
  } = query;

  let departments: _Department[];
  let totalCount: number = 0;

  try {
    const filters: _DepartmentsFilter = {
      name: {
        value: name,
        type: 'like',
        order
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    departments = await database.departments.get(filters, pagination);
    totalCount = await database.departments.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'DEPARTMENTS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const departmentsSerialized = departments.map((department) => department.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: departmentsSerialized,
    pagination: paginationResult
  });
}
