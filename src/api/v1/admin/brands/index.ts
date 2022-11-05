import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteBrand from './delete';
import getBrand from './getBrand';
import getBrands from './getBrands';
import verifyOffers from './verifyOffers';

import createBrandSchema from '../../schemas/admin/brands/create';
import updateSchema from '../../schemas/admin/brands/update';

const express = require('express');

const brandsRouter = express.Router();

brandsRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createBrandSchema),
  create
);

brandsRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

brandsRouter.delete(
  '/:brandId',
  authorization(['administrator']),
  deleteBrand
);

brandsRouter.get(
  '/:brandId',
  authorization(['administrator']),
  getBrand
);

brandsRouter.get(
  '/',
  authorization(['administrator']),
  getBrands
);

brandsRouter.put(
  '/offers/verified',
  verifyOffers
);

export default brandsRouter;
