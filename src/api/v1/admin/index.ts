import usersRouter from './users';
import offersRouter from './offers';
import departmentRouter from './departments';
import categoryRouter from './categories';
import brandRouter from './brands';
import invoicesRouter from './invoices';
import productsRouter from './products';
import salesRouter from './sales';
import surveysRouter from './surveys';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/users', usersRouter);
adminRouter.use('/offers', offersRouter);
adminRouter.use('/departments', departmentRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/brands', brandRouter);
adminRouter.use('/invoices', invoicesRouter);
adminRouter.use('/products', productsRouter);
adminRouter.use('/sales', salesRouter);
adminRouter.use('/surveys', surveysRouter);

export default adminRouter;
