import { ItemNotFound } from '../../../../database/errors';
import _Request from '../../../../definitions/request';
import _Purchase from '../../../../entities/Purchase';
import _User from '../../../../entities/User';
import _Ticket from '../../../../entities/Ticket';
import _Product from '../../../../entities/Product';
import _Wallet from '../../../../entities/Wallet';
import logger from '../../../../helpers/logger';
import {
  PurchasesFilters as _PurchasesFilters
} from '../../../../database/interfaces';

export default async function (req:_Request, res:any) {
  const {
    database,
    query,
    user
  } = req;
  const {
    date = '',
    perPage = 0,
    currentPage = 0,
    order = ''
  } = query;

  let tickets: _Ticket[] = [];
  let totalCount: number = 0;

  try {
    const filters: _PurchasesFilters = {
      date: {
        value: date,
        type: 'like',
        order
      },
      status: {
        value: 'approved',
        type: 'like',
        order
      },
      userId: {
        value: user.id,
        type: 'match',
        order
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    tickets = await database.sales.getPurchases(filters, pagination);
    totalCount = await database.sales.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PURCHASES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const products: any[] = [];

  await Promise.all(tickets.map(async (ticket) => {
    let productsPromises: any[] = [];

    ticket.saleDetail.map((detail) => {
      let product;

      try {
        product = database.products.getById(Number(detail.productId));
      } catch (error) {
        if (error instanceof ItemNotFound) {
          product = new _Product(0, '', '', 0, '', 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0);
        } else {
          throw error;
        }
      }

      productsPromises.push(product);
      return productsPromises;
    });
    let productsByTicket = await Promise.all(productsPromises);
    products.push([productsByTicket]);

    productsPromises = [];
    productsByTicket = [];
  }));

  const purchasesSerialized: any[] = [];

  for (let index = 0; index < tickets.length; index += 1) {
    const purchase = new _Purchase(
      tickets[index].id,
      tickets[index].userId,
      tickets[index].code,
      tickets[index].date,
      tickets[index].subtotal,
      tickets[index].discountPoints,
      tickets[index].total,
      tickets[index].status,
      tickets[index].request,
      tickets[index].saleDetail,
      products[index].flat()
    );

    purchasesSerialized.push(purchase);
  }

  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: purchasesSerialized,
    pagination: paginationResult
  });
}
