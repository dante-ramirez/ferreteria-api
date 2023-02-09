import Product from '../../../../entities/Product';
import Department from '../../../../entities/Department';
import Category from '../../../../entities/Category';
import Brand from '../../../../entities/Brand';
import Offer from '../../../../entities/Offer';
import Discount from '../../../../entities/Discount';
import IndividualDiscount from '../../../../entities/IndividualDiscount';
import ProductDiscount from '../../../../entities/ProductDiscount';
import IndividualOffer from '../../../../entities/IndividualOffer';
import { ItemAlreadyExist, ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import _file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database, body, files } = req;
  const {
    name,
    details,
    stock,
    code,
    price,
    rewardPoints,
    model,
    departmentId,
    categoryId,
    brandId
  } = body;

  const filesNames: any[] = [];

  for (let index = 0; index < 4; index += 1) {
    let filename: string;

    if (files[index]) {
      filename = files[index].filename;
    } else {
      filename = '';
    }

    filesNames.push(filename);
  }

  const currentDate = new Date();

  let product = new Product(
    0,
    name,
    details,
    stock,
    code,
    price,
    0,
    rewardPoints,
    model,
    filesNames[0],
    filesNames[1],
    filesNames[2],
    filesNames[3],
    departmentId,
    categoryId,
    brandId,
    0
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

    for (let index = 0; index < files.length; index += 1) {
      _file.delete('uploads/products/', files[index].filename);
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  let offer: Offer;
  let department: Department;

  try {
    department = await database.departments.getById(Number(departmentId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'DEPARTMENT_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  if (department.offersId !== 1) {
    if (Date.parse(department.beginAt) < Date.parse(currentDate.toString())
    && Date.parse(currentDate.toString()) < Date.parse(department.finishAt)) {
      try {
        offer = await database.offers.getById(Number(department.offersId));
      } catch (error) {
        let statusCode = 500;
        let errorCode = 'UNEXPECTED_ERROR';

        if (error instanceof ItemNotFound) {
          statusCode = 404;
          errorCode = 'OFFER_WAS_NOT_FOUND';
        }

        logger.log(error);
        return res.status(statusCode).send({ code: errorCode });
      }
    } else {
      offer = new Offer(0, 0);
    }
  } else {
    offer = new Offer(1, 0);
  }

  const departmentDiscount = new Discount(
    department.id,
    department.name,
    offer,
    department.beginAt,
    department.finishAt
  );

  let category: Category;

  try {
    category = await database.categories.getById(Number(categoryId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'CATEGORY_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  if (category.offersId !== 1) {
    if (Date.parse(category.beginAt) < Date.parse(currentDate.toString())
    && Date.parse(currentDate.toString()) < Date.parse(category.finishAt)) {
      try {
        offer = await database.offers.getById(Number(category.offersId));
      } catch (error) {
        let statusCode = 500;
        let errorCode = 'UNEXPECTED_ERROR';

        if (error instanceof ItemNotFound) {
          statusCode = 404;
          errorCode = 'OFFER_WAS_NOT_FOUND';
        }

        logger.log(error);
        return res.status(statusCode).send({ code: errorCode });
      }
    } else {
      offer = new Offer(0, 0);
    }
  } else {
    offer = new Offer(1, 0);
  }

  const categoryDiscount = new Discount(
    category.id,
    category.name,
    offer,
    category.beginAt,
    category.finishAt
  );

  let brand: Brand;

  try {
    brand = await database.brands.getById(Number(brandId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'BRAND_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  if (brand.offersId !== 1) {
    if (Date.parse(brand.beginAt) < Date.parse(currentDate.toString())
    && Date.parse(currentDate.toString()) < Date.parse(brand.finishAt)) {
      try {
        offer = await database.offers.getById(Number(brand.offersId));
      } catch (error) {
        let statusCode = 500;
        let errorCode = 'UNEXPECTED_ERROR';

        if (error instanceof ItemNotFound) {
          statusCode = 404;
          errorCode = 'OFFER_WAS_NOT_FOUND';
        }

        logger.log(error);
        return res.status(statusCode).send({ code: errorCode });
      }
    } else {
      offer = new Offer(0, 0);
    }
  } else {
    offer = new Offer(1, 0);
  }

  const brandDiscount = new Discount(
    brand.id,
    brand.name,
    offer,
    brand.beginAt,
    brand.finishAt
  );

  const timestamp = new Date();

  let individualOffer = new IndividualOffer(
    0,
    1,
    String(timestamp),
    String(timestamp)
  );

  try {
    individualOffer = await database.individualOffers.create(individualOffer);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'INDIVIDUAL_OFFER_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  if (individualOffer.offersId !== 1) {
    if (Date.parse(individualOffer.beginAt) < Date.parse(currentDate.toString())
    && Date.parse(currentDate.toString()) < Date.parse(individualOffer.finishAt)) {
      try {
        offer = await database.offers.getById(Number(individualOffer.offersId));
      } catch (error) {
        let statusCode = 500;
        let errorCode = 'UNEXPECTED_ERROR';

        if (error instanceof ItemNotFound) {
          statusCode = 404;
          errorCode = 'OFFER_WAS_NOT_FOUND';
        }

        logger.log(error);
        return res.status(statusCode).send({ code: errorCode });
      }
    } else {
      offer = new Offer(0, 0);
    }
  } else {
    offer = new Offer(1, 0);
  }

  const individualOfferDiscount = new IndividualDiscount(
    individualOffer.id,
    offer,
    individualOffer.beginAt,
    individualOffer.finishAt
  );

  let discount = departmentDiscount.offer.discount + categoryDiscount.offer.discount + brandDiscount.offer.discount
  + individualOfferDiscount.offer.discount;

  if (discount >= 1) {
    discount /= 100;
  }

  product.finalPrice = product.price - (product.price * discount);

  try {
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

  const productDiscount = new ProductDiscount(
    product.id,
    product.name,
    product.details,
    product.stock,
    product.code,
    product.price,
    product.finalPrice,
    product.rewardPoints,
    product.model,
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    departmentDiscount,
    categoryDiscount,
    brandDiscount,
    individualOfferDiscount
  );

  return res.status(201).send({
    statusText: 'Success', destination: files[0].destination, product: productDiscount.serialize()
  });
}
