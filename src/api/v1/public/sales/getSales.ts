import { ItemNotFound } from '../../../../database/errors';
import { SalesFilters as _SalesFilters } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Ticket from '../../../../entities/Ticket';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    id = 0,
    date = '',
    status = '',
    perPage = 0,
    currentPage = 0
  } = query;

  let sales: _Ticket[];
  let TotalCount: number = 0;

  try {
    const filters: _SalesFilters = {
      id: {
        value: id,
        type: 'match'
      },
      date: {
        value: date,
        type: 'like'
      },
      status: {
        value: status,
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
