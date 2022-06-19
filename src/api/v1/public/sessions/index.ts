import schemaValidator from '../../../../middlewares/jsonSchemaValidator';

import login from './login';

import loginSchema from '../../schemas/sessions/login';

const express = require('express');

const sessionsRouter = express.Router();

sessionsRouter.post(
  '/login',
  schemaValidator(loginSchema),
  login
);

export default sessionsRouter;
