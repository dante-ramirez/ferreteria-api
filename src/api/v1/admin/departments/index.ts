import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import createDepartment from './create';
import update from './update';

import createDepartmentSchema from '../../schemas/admin/departments/create';
import updateSchema from '../../schemas/admin/departments/update';

const express = require('express');

const departmentRouter = express.Router();

departmentRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createDepartmentSchema),
  createDepartment
);

departmentRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

export default departmentRouter;
