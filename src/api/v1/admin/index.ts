import departmentRouter from './departments';
import categoryRouter from './categories';
import brandRouter from './brands';

// import productsRouter from './products';
// import packsRouter from './packs';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/departments', departmentRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/brands', brandRouter);
// publicRouter.use('/products', productsRouter);
// publicRouter.use('/packs', packsRouter);

export default adminRouter;
