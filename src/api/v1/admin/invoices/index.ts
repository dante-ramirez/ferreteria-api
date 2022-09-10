import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteOffer from './delete';
import getInvoice from './getInvoice';
import getInvoices from './getInvoices';

import createSchema from '../../schemas/admin/invoices/create';
import updateSchema from '../../schemas/admin/invoices/update';

const express = require('express');

const invoicesRouter = express.Router();

invoicesRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createSchema),
  create
);

invoicesRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

invoicesRouter.delete(
  '/:invoiceId',
  authorization(['administrator']),
  deleteOffer
);

invoicesRouter.get(
  '/:invoiceId',
  authorization(['administrator']),
  getInvoice
);

invoicesRouter.get(
  '/',
  authorization(['administrator']),
  getInvoices
);

export default invoicesRouter;
