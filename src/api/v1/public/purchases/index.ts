import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import requestInvoice from './requestInvoice';
import getPurchase from './getPurchase';
import getPurchases from './getPurchases';

import createSaleSchema from '../../schemas/public/sales/create';

const express = require('express');

const purchasesRouter = express.Router();

purchasesRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createSaleSchema),
  create
);

purchasesRouter.put(
  '/:salesId',
  authorization(['client']),
  requestInvoice
);

purchasesRouter.get(
  '/:salesId',
  authorization(['client']),
  getPurchase
);

purchasesRouter.get(
  '/',
  authorization(['client']),
  getPurchases
);

export default purchasesRouter;
