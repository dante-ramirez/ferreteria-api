import departmentRouter from './departments';

// import productsRouter from './products';
// import packsRouter from './packs';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/departments', departmentRouter);
// publicRouter.use('/products', productsRouter);
// publicRouter.use('/packs', packsRouter);

export default adminRouter;
