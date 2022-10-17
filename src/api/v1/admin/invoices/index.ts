import authorization from '../../../../middleware/authorization';
import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import multer from '../../../../middleware/multer';

import create from './create';
import update from './update';
import deleteInvoice from './delete';
import getInvoice from './getInvoice';
import getInvoices from './getInvoices';

import createSchema from '../../schemas/admin/invoices/create';
import updateSchema from '../../schemas/admin/invoices/update';

const express = require('express');

const invoicesRouter = express.Router();

invoicesRouter.post(
  '/',
  authorization(['administrator']),
  multer.uploadInvoice,
  schemaValidator(createSchema, 'form-data'),
  create
);

invoicesRouter.put(
  '/:id',
  authorization(['administrator']),
  multer.uploadInvoice,
  schemaValidator(updateSchema, 'form-data'),
  update
);

invoicesRouter.delete(
  '/:invoiceId',
  authorization(['administrator']),
  deleteInvoice
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
