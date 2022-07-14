import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';
import deleteBrand from './delete';

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
  '/:userId',
  authorization(['administrator']),
  deleteBrand
);

export default brandsRouter;
