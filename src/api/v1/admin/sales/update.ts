import { ItemNotFound } from '../../../../database/errors';
import _Sale from '../../../../entities/Sale';
import _SaleDetail from '../../../../entities/SaleDetail';
import _Wallet from '../../../../entities/Wallet';
import _Product from '../../../../entities/Product';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params,
    body
  } = req;
  const { salesId } = params;
  const { status } = body;

  let objectResult: any = {};
  let sale: _Sale;

  try {
    sale = await database.sales.getById(Number(salesId));
    sale.status = status;

    sale = await database.sales.update(sale);
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

  if (status === 'approved') {
    const { discountPoints } = sale;

    let saleDetails: _SaleDetail[];

    try {
      saleDetails = await database.saleDetails.getBySalesId(salesId);
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

    let rewardPoints: number = 0;
    const products: _Product[] = [];

    try {
      let product: _Product;
      await Promise.all(saleDetails.map(async (detail: any) => {
        product = await database.products.getById(Number(detail.productId));

        rewardPoints += product.rewardPoints;
        product.stock -= detail.quantity;

        product = await database.products.update(product);
        products.push(product);
      }));
    } catch (error) {
      let statusCode = 500;
      let errorCode = 'UNEXPECTED_ERROR';

      if (error instanceof ItemNotFound) {
        statusCode = 404;
        errorCode = 'PRODUCT_WAS_NOT_FOUND';
      }

      logger.log(error);
      return res.status(statusCode).send({ code: errorCode });
    }

    let wallet: _Wallet;

    try {
      wallet = await database.wallets.getByUserId(Number(sale.userId));

      wallet.points = wallet.points - discountPoints + rewardPoints;

      await database.wallets.update(wallet);
    } catch (error) {
      let errorCode = 'UNEXPECTED_ERROR';
      let statusCode = 500;

      if (error instanceof ItemNotFound) {
        statusCode = 404;
        errorCode = 'WALLET_WAS_NOT_FOUND';
      }

      logger.log(error);
      return res.status(statusCode).send({ code: errorCode });
    }

    const productsSerialized = products.map((product) => product.serialize());
    const saleDetailsSerialized = saleDetails.map((detail) => detail.serialize());
    objectResult = {
      sale: sale.serialize(),
      saleDetails: saleDetailsSerialized,
      product: productsSerialized,
      wallet: wallet.serialize()
    };
  } else if (status === 'canceled') {
    return res.status(200).send(sale);
  }

  return res.status(200).send(objectResult);
}
