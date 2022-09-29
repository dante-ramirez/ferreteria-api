import usersRouter from './users';
import sessionsRouter from './sessions';
import walletsRouter from './wallets';
import favoritesRouter from './favorites';
import PurchasesRouter from './purchases';
import saleDetailsRouter from './saleDetails';
import productsRouter from './products';

import healthCheck from './healthCheck';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/sessions', sessionsRouter);
publicRouter.use('/users', usersRouter);
publicRouter.use('/wallets', walletsRouter);
publicRouter.use('/favorites', favoritesRouter);
publicRouter.use('/purchases', PurchasesRouter);
publicRouter.use('/saleDetails', saleDetailsRouter);
publicRouter.use('/products', productsRouter);
publicRouter.get('', healthCheck);

export default publicRouter;
