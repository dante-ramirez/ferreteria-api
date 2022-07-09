import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';

import createSchema from '../../schemas/public/wallets/create';
import updateSchema from '../../schemas/public/wallets/update';

const express = require('express');

const walletsRouter = express.Router();

walletsRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createSchema),
  create
);

walletsRouter.put(
  '/',
  authorization(['client']),
  schemaValidator(updateSchema),
  update
);

export default walletsRouter;
