import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import update from './update';
import getSales from './getSales';

import updateSchema from '../../schemas/admin/sales/update';

const express = require('express');

const salesRouter = express.Router();

salesRouter.put(
  '/:salesId',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

salesRouter.get(
  '/',
  authorization(['administrator']),
  getSales
);

export default salesRouter;
