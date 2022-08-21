import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Sale from '../../../../entities/sale';
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
    total,
    subtotal
  } = body;

  let sale = new Sale(
    0,
    code,
    date,
    total,
    subtotal,
    user.id
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

  return res.status(201).send(sale.serialize());
}
