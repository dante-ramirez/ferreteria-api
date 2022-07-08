import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import createCategory from './create';
import update from './update';

import createBrandSchema from '../../schemas/admin/brands/create';
import updateSchema from '../../schemas/admin/brands/update';

const express = require('express');

const brandRouter = express.Router();

brandRouter.post(
  '/',
  schemaValidator(createBrandSchema),
  createCategory
);

brandRouter.put(
  '/:id',
  authorization(['client']),
  schemaValidator(updateSchema),
  update
);

export default brandRouter;
