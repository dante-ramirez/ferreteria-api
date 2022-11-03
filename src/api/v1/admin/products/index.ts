import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';
import multer from '../../../../middleware/multer';

import create from './create';
import update from './update';
import deleteProduct from './delete';
import getProduct from './getProduct';
import getProducts from './getProducts';

import createSchema from '../../schemas/admin/products/create';
import updateSchema from '../../schemas/admin/products/update';

const express = require('express');

const productsRouter = express.Router();

productsRouter.post(
  '/',
  authorization(['administrator']),
  multer.uploadProduct,
  schemaValidator(createSchema, 'form-data'),
  create
);

productsRouter.put(
  '/:id',
  authorization(['administrator']),
  multer.uploadProduct,
  schemaValidator(updateSchema, 'form-data'),
  update
);

productsRouter.delete(
  '/:productId',
  authorization(['administrator']),
  deleteProduct
);

productsRouter.get(
  '/:productId',
  authorization(['administrator']),
  getProduct
);

productsRouter.get(
  '/',
  authorization(['administrator']),
  getProducts
);

export default productsRouter;
