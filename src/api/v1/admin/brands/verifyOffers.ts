import Brand from '../../../../entities/Brand';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let brands: Brand[];
  const offersUpdated: Brand[] = [];
  const currentDate = new Date();

  try {
    brands = await database.brands.getAllWithOffers();

    await Promise.all(brands.map(async (brand) => {
      if (Date.parse(brand.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(brand.finishAt)) {
        const brandToUpdate = new Brand(
          brand.id,
          brand.name,
          1,
          brand.beginAt,
          brand.finishAt
        );

        const offerUpdated = await database.brands.update(brandToUpdate);
        offersUpdated.push(offerUpdated);
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'BRANDS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((brand) => brand.serialize()));
}
