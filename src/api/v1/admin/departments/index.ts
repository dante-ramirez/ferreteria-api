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
  schemaValidator(createDepartmentSchema),
  createDepartment
);

departmentRouter.put(
  '/',
  authorization(['client']),
  schemaValidator(updateSchema),
  update
);

export default departmentRouter;
