import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteSale from './delete';
import getSale from './getSale';
import getSales from './getSales';

import createSaleSchema from '../../schemas/public/sales/create';
import updateSchema from '../../schemas/public/sales/update';

const express = require('express');

const salesRouter = express.Router();

salesRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createSaleSchema),
  create
);

salesRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

salesRouter.delete(
  '/:salesId',
  authorization(['administrator']),
  deleteSale
);

salesRouter.get(
  '/:salesId',
  authorization(['administrator']),
  getSale
);

salesRouter.get(
  '/',
  authorization(['administrator']),
  getSales
);

export default salesRouter;
