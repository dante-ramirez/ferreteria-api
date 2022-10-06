import authorization from '../../../../middleware/authorization';

import getProduct from './getProduct';
import getRelatedProducts from './getRelatedProducts';

const express = require('express');

const productsRouter = express.Router();

productsRouter.get(
  '/:productId',
  authorization(['client']),
  getProduct
);

productsRouter.get(
  '/',
  authorization(['client']),
  getRelatedProducts
);

export default productsRouter;
