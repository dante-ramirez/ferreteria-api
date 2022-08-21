import { ItemNotFound } from '../../../../database/errors';
import { ProductsFilter as _ProductsFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Product from '../../../../entities/Product';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    description = '',
    code = '',
    model = '',
    perPage = 0,
    currentPage = 0
  } = query;

  let products: _Product[];
  let TotalCount: number = 0;

  try {
    const filters: _ProductsFilter = {
      name: {
        value: name,
        type: 'like'
      },
      description: {
        value: description,
        type: 'like'
      },
      code: {
        value: code,
        type: 'like'
      },
      model: {
        value: model,
        type: 'like'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    products = await database.products.get(filters, pagination);
    TotalCount = await database.products.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PRODUCTS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const productsSerialized = products.map((product) => product.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: TotalCount
  };

  return res.status(200).send({
    items: productsSerialized,
    pagination: paginationResult
  });
}
