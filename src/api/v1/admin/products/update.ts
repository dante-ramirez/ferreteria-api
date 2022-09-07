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
  const { id } = params;

  let product: _Product;

  try {
    product = await database.products.getById(Number(id));
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.code = code;
    product.price = price;
    product.finalPrice = finalPrice;
    product.rewardPoints = rewardPoints;
    product.model = model;
    product.pathImage1 = pathImage1;
    product.pathImage2 = pathImage2;
    product.pathImage3 = pathImage3;
    product.pathImage4 = pathImage4;
    product.departmentId = departmentId;
    product.categoryId = categoryId;
    product.brandId = brandId;

    await database.products.update(product);
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
