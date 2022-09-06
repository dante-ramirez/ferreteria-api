import { ItemNotFound } from '../../../../database/errors';
import { SaleDetailsFilters as _SaleDetailsFilters } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _SaleDetail from '../../../../entities/SaleDetail';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    id = 0,
    salesId = 0,
    productId = 0,
    perPage = 0,
    currentPage = 0
  } = query;

  let saleDetails: _SaleDetail[];
  let TotalCount: number = 0;

  try {
    const filters: _SaleDetailsFilters = {
      id: {
        value: id,
        type: 'like'
      },
      salesId: {
        value: salesId,
        type: 'like'
      },
      productId: {
        value: productId,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    saleDetails = await database.saleDetails.get(filters, pagination);
    TotalCount = await database.saleDetails.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_DETAILS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const saleDetailsSerialized = saleDetails.map((saleDetail) => saleDetail.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: saleDetailsSerialized,
    pagination: paginationResult
  });
}
