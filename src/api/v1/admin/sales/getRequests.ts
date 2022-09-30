import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import _Sales from '../../../../entities/Sales';
import _User from '../../../../entities/User';
import _Ticket from '../../../../entities/Ticket';
import _Product from '../../../../entities/Product';
import _Wallet from '../../../../entities/Wallet';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    perPage = 0,
    currentPage = 0
  } = query;

  let tickets: _Ticket[] = [];
  let TotalCount: number = 0;

  try {
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    tickets = await database.sales.getInvoiceRequests(pagination);
    TotalCount = tickets.length;
  } catch (error) {
    const statusCode = 500;
    const errorCode = 'UNEXPECTED_ERROR';

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const users: any[] = [];
  const products: any[] = [];

  tickets.map((ticket) => {
    let user;

    try {
      user = database.users.getById(Number(ticket.userId));
    } catch (error) {
      if (error instanceof ItemNotFound) {
        user = new _User(0, '', '', '', '', 'client', false, false, new _Wallet(0, 0, 0, 0));
      } else {
        throw error;
      }
    }

    users.push(user);
    const productTemp: any[] = [];

    ticket.saleDetail.map(async (detail) => {
      let product;

      try {
        product = await database.products.getById(Number(detail.productId));
      } catch (error) {
        if (error instanceof ItemNotFound) {
          product = new _Product(0, '', '', 0, '', 0, 0, 0, '', '', '', '', '', 0, 0, 0);
        } else {
          throw error;
        }
      }
      productTemp.push(product);
    });
    products.push(productTemp);
    productTemp.splice(0, productTemp.length);
    return products;
  });

  const user: _User[] = await Promise.all(users);
  const salesSerialized: any[] = [];

  for (let index = 0; index < tickets.length; index += 1) {
    const sale = new _Sales(
      tickets[index].id,
      tickets[index].userId,
      user[index],
      tickets[index].code,
      tickets[index].date,
      tickets[index].subtotal,
      tickets[index].discountPoints,
      tickets[index].total,
      tickets[index].status,
      tickets[index].request,
      tickets[index].saleDetail,
      products[index]
    );

    salesSerialized.push(sale.serialize());
  }

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
