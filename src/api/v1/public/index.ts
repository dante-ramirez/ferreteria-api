import usersRouter from './users';
import sessionsRouter from './sessions';
import walletsRouter from './wallets';
import favoritesRouter from './favorites';
import purchasesRouter from './purchases';
import saleDetailsRouter from './saleDetails';
import productsRouter from './products';
import surveysRouter from './surveys';

import healthCheck from './healthCheck';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/sessions', sessionsRouter);
publicRouter.use('/users', usersRouter);
publicRouter.use('/wallets', walletsRouter);
publicRouter.use('/favorites', favoritesRouter);
publicRouter.use('/purchases', purchasesRouter);
publicRouter.use('/saleDetails', saleDetailsRouter);
publicRouter.use('/products', productsRouter);
publicRouter.use('/surveys', surveysRouter);
publicRouter.get('', healthCheck);

export default publicRouter;
