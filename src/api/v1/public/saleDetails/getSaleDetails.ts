/* eslint-disable camelcase */
import { ItemNotFound } from '../../../../database/errors';
import { SaleDetailsFilter as _SaleDetailsFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _SaleDetail from '../../../../entities/saleDetail';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    id = 0,
    sales_id = 0,
    product_id = 0,
    perPage = 0,
    currentPage = 0
  } = query;

  let saleDetails: _SaleDetail[];
  let TotalCount: number = 0;

  try {
    const filters: _SaleDetailsFilter = {
      id: {
        value: id,
        type: 'like'
      },
      sales_id: {
        value: sales_id,
        type: 'like'
      },
      product_id: {
        value: product_id,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    saleDetails = await database.saleDetail.get(filters, pagination);
    TotalCount = await database.saleDetail.count(filters);
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
