import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';

import createCategorySchema from '../../schemas/admin/categories/create';
import updateSchema from '../../schemas/admin/categories/update';

const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createCategorySchema),
  create
);

categoriesRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

export default categoriesRouter;
