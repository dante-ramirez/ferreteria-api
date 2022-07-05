import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import createCategory from './create';
import update from './update';

import createCategorySchema from '../../schemas/admin/categories/create';
import updateSchema from '../../schemas/admin/categories/update';

const express = require('express');

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  schemaValidator(createCategorySchema),
  createCategory
);

categoryRouter.put(
  '/:id',
  authorization(['client']),
  schemaValidator(updateSchema),
  update
);

export default categoryRouter;
