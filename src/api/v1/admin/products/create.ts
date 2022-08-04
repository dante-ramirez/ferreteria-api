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
    price,
    code,
    discount,
    reward_points,
    model,
    path_image1,
    path_image2,
    path_image3,
    path_image4,
    department_id,
    category_id,
    brand_id,
    offers_id
  } = body;

  let product = new Product(
    0,
    name,
    description,
    stock,
    price,
    code,
    discount,
    reward_points,
    model,
    path_image1,
    path_image2,
    path_image3,
    path_image4,
    department_id,
    category_id,
    brand_id,
    offers_id
  );

  try {
    product = await database.product.create(product);
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
