/* eslint-disable camelcase */
import { ItemNotFound } from '../../../../database/errors';
import _Product from '../../../../entities/Product';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
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
  const { id } = params;

  let product: _Product;

  try {
    product = await database.product.getByID(Number(id));
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.price = price;
    product.code = code;
    product.discount = discount;
    product.reward_points = reward_points;
    product.model = model;
    product.path_image1 = path_image1;
    product.path_image2 = path_image2;
    product.path_image3 = path_image3;
    product.path_image4 = path_image4;
    product.department_id = department_id;
    product.category_id = category_id;
    product.brand_id = brand_id;
    product.offers_id = offers_id;

    await database.product.update(product);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PRODUCT_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(product.serialize());
}
