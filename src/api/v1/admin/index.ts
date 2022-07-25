import usersRouter from './users';
import invoicesRouter from './invoices';
import salesRouter from './sales';
import saleDetailsRouter from './saleDetails';
import offersRouter from './offers';
import departmentRouter from './departments';
import categoryRouter from './categories';
import brandRouter from './brands';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/users', usersRouter);
adminRouter.use('/invoices', invoicesRouter);
adminRouter.use('/sales', salesRouter);
adminRouter.use('/saleDetails', saleDetailsRouter);
adminRouter.use('/offers', offersRouter);
adminRouter.use('/departments', departmentRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/brands', brandRouter);

export default adminRouter;
