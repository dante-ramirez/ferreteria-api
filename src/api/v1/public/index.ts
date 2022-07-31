import usersRouter from './users';
import sessionsRouter from './sessions';
import walletsRouter from './wallets';
import favoritesRouter from './favorites';
import salesRouter from './sales';
import saleDetailsRouter from './saleDetails';

import healthCheck from './healthCheck';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/sessions', sessionsRouter);
publicRouter.use('/users', usersRouter);
publicRouter.use('/wallets', walletsRouter);
publicRouter.use('/favorites', favoritesRouter);
publicRouter.use('/sales', salesRouter);
publicRouter.use('/saleDetails', saleDetailsRouter);
publicRouter.get('', healthCheck);

export default publicRouter;
