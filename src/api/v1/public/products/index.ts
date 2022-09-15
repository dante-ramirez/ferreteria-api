import authorization from '../../../../middleware/authorization';

import getProduct from './getProduct';

const express = require('express');

const productsRouter = express.Router();

productsRouter.get(
  '/:productId',
  authorization(['client']),
  getProduct
);

export default productsRouter;
