import authorization from '../../../../middleware/authorization';

import getProduct from './getProduct';
import getProducts from './getProducts';
import getRelatedProducts from './getRelatedProducts';
import getProductSimple from './getProductSimple';
import getProductsSimple from './getProductsSimple';

const express = require('express');

const productsRouter = express.Router();

productsRouter.get(
  '/:productId',
  authorization(['client']),
  getProductSimple
);

productsRouter.get(
  '/',
  authorization(['client']),
  getProductsSimple
);

productsRouter.get(
  '/v2/:productId',
  authorization(['client']),
  getProduct
);

productsRouter.get(
  '/v2',
  authorization(['client']),
  getProducts
);

productsRouter.get(
  '/',
  authorization(['client']),
  getRelatedProducts
);

export default productsRouter;
