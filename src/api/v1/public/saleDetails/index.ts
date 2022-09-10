import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteSaleDetail from './delete';
import getSaleDetail from './getSaleDetail';
import getSalesDetails from './getSaleDetails';

import createSaleSchema from '../../schemas/public/saleDetails/create';
import updateSchema from '../../schemas/public/saleDetails/update';

const express = require('express');

const saleDetailsRouter = express.Router();

saleDetailsRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createSaleSchema),
  create
);

saleDetailsRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

saleDetailsRouter.delete(
  '/:saleDetailsId',
  authorization(['administrator']),
  deleteSaleDetail
);

saleDetailsRouter.get(
  '/:saleDetailsId',
  authorization(['administrator']),
  getSaleDetail
);

saleDetailsRouter.get(
  '/',
  authorization(['administrator']),
  getSalesDetails
);

export default saleDetailsRouter;
