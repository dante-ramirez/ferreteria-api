import { ItemNotFound } from '../../../../database/errors';
import _Sale from '../../../../entities/Sale';
import _SaleDetail from '../../../../entities/SaleDetail';
import _Product from '../../../../entities/Product';
import _Purchase from '../../../../entities/Purchase';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    salesId
  } = params;

  let sale: _Sale;

  try {
    sale = await database.sales.getById(Number(salesId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  let saleDetail: _SaleDetail[];

  try {
    saleDetail = await database.saleDetails.getBySalesId(Number(sale.id));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_DETAIL_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const products: any[] = [];

  await Promise.all(saleDetail.map(async (detail) => {
    let product;

    try {
      product = await database.products.getById(Number(detail.productId));
    } catch (error) {
      if (error instanceof ItemNotFound) {
        product = new _Product(0, '', '', 0, '', 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0);
      } else {
        throw error;
      }
    }

    products.push(product);
  }));

  const purchase = new _Purchase(
    sale.id,
    sale.userId,
    sale.code,
    sale.date,
    sale.subtotal,
    sale.discountPoints,
    sale.total,
    sale.status,
    sale.request,
    saleDetail,
    products
  );

  return res.status(200).send(purchase.serialize());
}
