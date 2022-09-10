import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteDepartment from './delete';
import getDepartment from './getDepartment';
import getDepartments from './getDepartments';

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

departmentsRouter.delete(
  '/:departmentId',
  authorization(['administrator']),
  deleteDepartment
);

departmentsRouter.get(
  '/:departmentId',
  authorization(['administrator']),
  getDepartment
);

departmentsRouter.get(
  '/',
  authorization(['administrator']),
  getDepartments
);

export default departmentsRouter;
