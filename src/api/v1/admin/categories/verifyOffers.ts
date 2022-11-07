import Category from '../../../../entities/Category';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let categories: Category[];
  const offersUpdated: Category[] = [];
  const currentDate = new Date();

  try {
    categories = await database.categories.getAllWithOffers();

    await Promise.all(categories.map(async (category) => {
      if (Date.parse(category.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(category.finishAt)) {
        const categoryToUpdate = new Category(
          category.id,
          category.name,
          1,
          category.beginAt,
          category.finishAt
        );

        const offerUpdated = await database.categories.update(categoryToUpdate);
        offersUpdated.push(offerUpdated);
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'CATEGORIES_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((category) => category.serialize()));
}
