import usersRouter from './users';
import sessionsRouter from './sessions';
// import productsRouter from './products';
// import packsRouter from './packs';

import healthCheck from './healthCheck';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/sessions', sessionsRouter);
publicRouter.use('/users', usersRouter);
// publicRouter.use('/products', productsRouter);
// publicRouter.use('/packs', packsRouter);
publicRouter.get('', healthCheck);

export default publicRouter;
