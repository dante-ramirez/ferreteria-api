import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Sale from '../../../../entities/Sale';
import SaleDetail from '../../../../entities/SaleDetail';
import Ticket from '../../../../entities/Ticket';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    user,
    body
  } = req;
  const {
    code,
    date,
    subtotal,
    discountPoints,
    total,
    products // : [{ productId, salePrice, quantity, amount }]
  } = body;

  let sale = new Sale(
    0,
    user.id,
    code,
    date,
    subtotal,
    discountPoints,
    total,
    'pending'
  );

  try {
    sale = await database.sales.create(sale);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'SALE_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const saleDetails: any[] = [];

  try {
    await Promise.all(products.map(async (product: any) => {
      let saleDetail = new SaleDetail(
        0,
        Number(sale.id),
        Number(product.productId),
        product.salePrice,
        Number(product.quantity),
        product.amount
      );

      saleDetail = await database.saleDetails.create(saleDetail);
      saleDetails.push(saleDetail.serialize());
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'SALE_DETAIL_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ amount: errorCode });
  }

  const ticket = new Ticket(
    Number(sale.id),
    Number(sale.userId),
    sale.code,
    sale.date,
    sale.subtotal,
    sale.discountPoints,
    sale.total,
    sale.status,
    saleDetails
  );

  return res.status(201).send(ticket);
}
