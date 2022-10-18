import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import _Sales from '../../../../entities/Sales';
import _User from '../../../../entities/User';
import _Ticket from '../../../../entities/Ticket';
import _Product from '../../../../entities/Product';
import _Wallet from '../../../../entities/Wallet';
import logger from '../../../../helpers/logger';
import {
  SalesFilters as _SalesFilters
} from '../../../../database/interfaces';

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

  let tickets: _Ticket[] = [];
  let totalCount: number = 0;

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

    tickets = await database.sales.get(filters, pagination);
    totalCount = await database.sales.count(filters);
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
    totalItems: totalCount
  };

  return res.status(200).send({
    items: salesSerialized,
    pagination: paginationResult
  });
}
