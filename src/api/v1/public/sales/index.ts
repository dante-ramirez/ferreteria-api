import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';
import deleteSale from './delete';
import getSale from './getSale';
import getSales from './getSales';

import createSaleSchema from '../../schemas/public/sales/create';
import updateSchema from '../../schemas/public/sales/update';

const express = require('express');

const offersRouter = express.Router();

offersRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createSaleSchema),
  create
);

offersRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

offersRouter.delete(
  '/:salesId',
  authorization(['administrator']),
  deleteSale
);

offersRouter.get(
  '/:salesId',
  authorization(['administrator']),
  getSale
);

offersRouter.get(
  '/',
  authorization(['administrator']),
  getSales
);

export default offersRouter;
