import Product from '../../../../entities/Product';
import ProductDiscountSimple from '../../../../entities/ProductDiscountSimple';
import { ItemNotFound } from '../../../../database/errors';
import { ProductsFilters as _ProductsFilters } from '../../../../database/interfaces';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    details = '',
    code = '',
    model = '',
    perPage = 0,
    currentPage = 0,
    orderBy = ''
  } = query;

  let products: Product[];
  let totalCount: number = 0;

  try {
    const filters: _ProductsFilters = {
      name: {
        value: name,
        type: 'like',
        order: orderBy
      },
      details: {
        value: details,
        type: 'like',
        order: orderBy
      },
      code: {
        value: code,
        type: 'like',
        order: orderBy
      },
      model: {
        value: model,
        type: 'like',
        order: orderBy
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    products = await database.products.get(filters, pagination);
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

  const productsDiscount: ProductDiscountSimple[] = [];

  await Promise.all(products.map(async (product) => {
    const saving = product.price - product.finalPrice;
    const percent = (saving * 100) / product.price;

    const productDiscount = new ProductDiscountSimple(
      product,
      saving,
      percent
    );

    productsDiscount.push(productDiscount);
    return productsDiscount;
  }));

  const productsSerialized = productsDiscount.map((productDiscount) => productDiscount.serialize());
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
