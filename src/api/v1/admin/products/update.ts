import { ItemNotFound } from '../../../../database/errors';
import Product from '../../../../entities/Product';
import Department from '../../../../entities/Department';
import Category from '../../../../entities/Category';
import Brand from '../../../../entities/Brand';
import IndividualOffer from '../../../../entities/IndividualOffer';
import Offer from '../../../../entities/Offer';
import Discount from '../../../../entities/Discount';
import IndividualDiscount from '../../../../entities/IndividualDiscount';
import ProductDiscount from '../../../../entities/ProductDiscount';
import _Request from '../../../../definitions/request';
import _file from '../../../../helpers/file';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params,
    body,
    files
  } = req;
  const { id } = params;
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
    brandId,
    individualOfferId
  } = body;

  const filesNames: any[] = [];
  let oldFilesNames: any[] = [];

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

  let product: Product;

  try {
    product = await database.products.getById(Number(id));

    product.name = name;
    product.details = details;
    product.stock = stock;
    product.code = code;
    product.price = price;
    product.rewardPoints = rewardPoints;
    product.model = model;

    oldFilesNames = [
      product.image1,
      product.image2,
      product.image3,
      product.image4
    ];
    [
      product.image1,
      product.image2,
      product.image3,
      product.image4
    ] = filesNames;

    product.departmentId = departmentId;
    product.categoryId = categoryId;
    product.brandId = brandId;
    product.individualOfferId = individualOfferId;
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

  let individualOffer: IndividualOffer;

  try {
    individualOffer = await database.individualOffers.getById(Number(individualOfferId));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'INDIVIDUAL_OFFER_WAS_NOT_FOUND';
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

    for (let index = 0; index < oldFilesNames.length; index += 1) {
      if (oldFilesNames[index] !== '') {
        _file.delete('uploads/products/', oldFilesNames[index]);
      }
    }
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PRODUCT_WAS_NOT_FOUND';
    }

    for (let index = 0; index < filesNames.length; index += 1) {
      if (filesNames[index] !== '') {
        _file.delete('uploads/products/', filesNames[index]);
      }
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
