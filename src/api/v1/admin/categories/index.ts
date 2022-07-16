import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';
import deleteCategory from './delete';
import getCategory from './getCategory';
import getCategories from './getCategories';

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

categoriesRouter.delete(
  '/:categoryId',
  authorization(['administrator']),
  deleteCategory
);

categoriesRouter.get(
  '/:categoryId',
  authorization(['administrator']),
  getCategory
);

categoriesRouter.get(
  '/',
  authorization(['administrator']),
  getCategories
);

export default categoriesRouter;
