import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Brand from '../../../../entities/Brand';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    name,
    offersId,
    beginAt,
    finishAt
  } = body;

  let brand = new Brand(
    0,
    name,
    offersId,
    beginAt,
    finishAt
  );

  try {
    brand = await database.brands.create(brand);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'BRAND_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(brand.serialize());
}
