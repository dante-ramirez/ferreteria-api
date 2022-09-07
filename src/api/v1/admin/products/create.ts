/* eslint-disable camelcase */
import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Product from '../../../../entities/Product';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    name,
    description,
    stock,
    code,
    price,
    finalPrice,
    rewardPoints,
    model,
    pathImage1,
    pathImage2,
    pathImage3,
    pathImage4,
    departmentId,
    categoryId,
    brandId
  } = body;

  let product = new Product(
    0,
    name,
    description,
    stock,
    code,
    price,
    finalPrice,
    rewardPoints,
    model,
    pathImage1,
    pathImage2,
    pathImage3,
    pathImage4,
    departmentId,
    categoryId,
    brandId
  );

  try {
    product = await database.products.create(product);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'PRODUCT_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(product.serialize());
}
