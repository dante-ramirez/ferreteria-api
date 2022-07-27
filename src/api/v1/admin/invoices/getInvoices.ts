import { ItemNotFound } from '../../../../database/errors';
import { InvoicesFilter as _InvoicesFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Invoice from '../../../../entities/Invoice';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    path = '',
    perPage = 0,
    currentPage = 0
  } = query;

  let invoices: _Invoice[];
  let TotalCount: number = 0;

  try {
    const filters: _InvoicesFilter = {
      path: {
        value: path,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    invoices = await database.invoice.get(filters, pagination);
    TotalCount = await database.invoice.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INVOICES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const invoicesSerialized = invoices.map((invoice) => invoice.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: invoicesSerialized,
    pagination: paginationResult
  });
}
