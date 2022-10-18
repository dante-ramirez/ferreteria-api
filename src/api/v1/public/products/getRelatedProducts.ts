import { ItemNotFound } from '../../../../database/errors';
import { RelatedProductsFilters as _RelatedProductsFilters } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Product from '../../../../entities/Product';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    departmentId = 0,
    categoryId = 0,
    brandId = 0,
    perPage = 0,
    currentPage = 0
  } = query;

  let products: _Product[];
  let totalCount: number = 0;

  try {
    const filters: _RelatedProductsFilters = {
      department_id: {
        value: departmentId,
        type: 'match'
      },
      category_id: {
        value: categoryId,
        type: 'match'
      },
      brand_id: {
        value: brandId,
        type: 'match'
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    products = await database.products.getRelatedProducts(filters, pagination);
    totalCount = await database.products.count(filters);
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
    totalItems: totalCount
  };

  return res.status(200).send({
    items: productsSerialized,
    pagination: paginationResult
  });
}
