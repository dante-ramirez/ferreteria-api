import offersRouter from './offers';
import usersRouter from './users';
import invoicesRouter from './invoices';
import salesRouter from './sales';
import saleDetailsRouter from './saleDetails';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/offers', offersRouter);
adminRouter.use('/users', usersRouter);
adminRouter.use('/invoices', invoicesRouter);
adminRouter.use('/sales', salesRouter);
adminRouter.use('/saleDetails', saleDetailsRouter);

export default adminRouter;
