import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import getWallet from './getWallet';
import enablePoints from './enablePoints';

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

walletsRouter.get(
  '/',
  authorization(['client']),
  getWallet
);

walletsRouter.put(
  '/points/enabled',
  enablePoints
);

export default walletsRouter;
