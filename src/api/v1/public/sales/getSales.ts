import { ItemNotFound } from '../../../../database/errors';
import { SalesFilter as _SalesFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Sale from '../../../../entities/sale';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    id = 0,
    date = 0,
    perPage = 0,
    currentPage = 0
  } = query;

  let sales: _Sale[];
  let TotalCount: number = 0;

  try {
    const filters: _SalesFilter = {
      id: {
        value: id,
        type: 'like'
      },
      date: {
        value: date,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    sales = await database.sales.get(filters, pagination);
    TotalCount = await database.sales.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const salesSerialized = sales.map((sale) => sale.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: salesSerialized,
    pagination: paginationResult
  });
}
