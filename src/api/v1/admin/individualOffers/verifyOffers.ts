import IndividualOffer from '../../../../entities/IndividualOffer';
import Product from '../../../../entities/Product';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let individualOffers: IndividualOffer[];
  let products: Product[];
  const offersUpdated: IndividualOffer[] = [];
  const productsUpdated: Product[] = [];
  const currentDate = new Date();

  try {
    individualOffers = await database.individualOffers.getAllWithOffers();

    await Promise.all(individualOffers.map(async (individualOffer) => {
      if (Date.parse(individualOffer.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(individualOffer.finishAt)) {
        const individualOfferToUpdate = new IndividualOffer(
          individualOffer.id,
          1,
          individualOffer.beginAt,
          individualOffer.finishAt
        );

        const offerUpdated = await database.individualOffers.update(individualOfferToUpdate);
        offersUpdated.push(offerUpdated);

        const discount = individualOffer.offersId - 1;

        try {
          products = await database.products.getByForeignId('individualOffer_id', individualOffer.id);

          await Promise.all(products.map(async (product) => {
            const saving = product.price - product.finalPrice;
            let percent = ((saving * 100) / product.price) - discount;

            if (percent >= 1) {
              percent /= 100;
            }

            const productTemp = product;
            productTemp.finalPrice = product.price - (product.price * percent);

            if (productTemp.finalPrice !== product.finalPrice) {
              try {
                const productUpdated = await database.products.update(productTemp);

                productsUpdated.push(productUpdated);
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
            }

            return productsUpdated;
          }));
        } catch (error) {
          throw error;
        }
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFERS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((individualOffer) => individualOffer.serialize()));
}
