import { ItemNotFound } from '../../../../database/errors';
import Product from '../../../../entities/Product';
import Request from '../../../../definitions/request';
import file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req:Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    productId
  } = params;

  let filesNames: any[];
  let product: Product;

  try {
    product = await database.products.getById(Number(productId));

    filesNames = [
      product.image1,
      product.image2,
      product.image3,
      product.image4
    ];

    await database.products.delete(Number(product.id));

    for (let index = 0; index < filesNames.length; index += 1) {
      if (filesNames[index] !== '') {
        file.delete('uploads/products/', filesNames[index]);
      } else {
        filesNames.splice(index, 1);
      }
    }
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

  const allNames = filesNames.join(', ');

  return res.status(200).send({
    statusText: 'Success',
    message: `Files with names: '${
      allNames.substring(0, allNames.length - 2)
    }' deleted successfully`
  });
}
