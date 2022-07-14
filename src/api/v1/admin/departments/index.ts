import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';

import createDepartmentSchema from '../../schemas/admin/departments/create';
import updateSchema from '../../schemas/admin/departments/update';

const express = require('express');

const departmentsRouter = express.Router();

departmentsRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createDepartmentSchema),
  create
);

departmentsRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

export default departmentsRouter;
