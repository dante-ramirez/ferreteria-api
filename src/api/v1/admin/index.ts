import departmentRouter from './departments';
import categoryRouter from './categories';
import brandRouter from './brands';
import usersRouter from './users';
// import packsRouter from './packs';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/departments', departmentRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/brands', brandRouter);
adminRouter.use('/users', usersRouter);
// adminRouter.use('/packs', packsRouter);

export default adminRouter;
