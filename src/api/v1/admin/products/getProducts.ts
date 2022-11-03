import { ItemNotFound } from '../../../../database/errors';
import { ProductsFilters as _ProductsFilters } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Product from '../../../../entities/Product';
import Department from '../../../../entities/Department';
import Category from '../../../../entities/Category';
import Brand from '../../../../entities/Brand';
import Offer from '../../../../entities/Offer';
import Discount from '../../../../entities/Discount';
import ProductDiscount from '../../../../entities/ProductDiscount';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    name = '',
    details = '',
    code = '',
    model = '',
    perPage = 0,
    currentPage = 0,
    orderBy = ''
  } = query;

  let products: _Product[];
  let totalCount: number = 0;
  const currentDate = new Date();

  try {
    const filters: _ProductsFilters = {
      name: {
        value: name,
        type: 'like',
        order: orderBy
      },
      details: {
        value: details,
        type: 'like',
        order: orderBy
      },
      code: {
        value: code,
        type: 'like',
        order: orderBy
      },
      model: {
        value: model,
        type: 'like',
        order: orderBy
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    products = await database.products.get(filters, pagination);
    totalCount = await database.products.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'PRODUCTS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const productsDiscount: any[] = [];

  await Promise.all(products.map(async (product) => {
    let offer: Offer;
    let department: Department;

    try {
      department = await database.departments.getById(Number(product.departmentId));
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

    const departmentDiscount = new Discount(
      department.id,
      department.name,
      offer,
      department.beginAt,
      department.finishAt
    );

    let category: Category;

    try {
      category = await database.categories.getById(Number(product.categoryId));
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

    const categoryDiscount = new Discount(
      category.id,
      category.name,
      offer,
      category.beginAt,
      category.finishAt
    );

    let brand: Brand;

    try {
      brand = await database.brands.getById(Number(product.brandId));
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

    const brandDiscount = new Discount(
      brand.id,
      brand.name,
      offer,
      brand.beginAt,
      brand.finishAt
    );

    let discount = departmentDiscount.offer.discount + categoryDiscount.offer.discount + brandDiscount.offer.discount;

    if (discount >= 1) {
      discount /= 100;
    }

    const productTemp = product;
    productTemp.finalPrice = product.price - (product.price * discount);

    try {
      await database.products.update(productTemp);
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
      productTemp.id,
      productTemp.name,
      productTemp.details,
      productTemp.stock,
      productTemp.code,
      productTemp.price,
      productTemp.finalPrice,
      productTemp.rewardPoints,
      productTemp.model,
      productTemp.image1,
      productTemp.image2,
      productTemp.image3,
      productTemp.image4,
      departmentDiscount,
      categoryDiscount,
      brandDiscount
    );

    productsDiscount.push(productDiscount);
    return productsDiscount;
  }));

  const productsSerialized = productsDiscount.map((productDiscount) => productDiscount.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: productsSerialized,
    pagination: paginationResult
  });
}
