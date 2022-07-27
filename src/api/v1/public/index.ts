import usersRouter from './users';
import sessionsRouter from './sessions';
import walletsRouter from './wallets';
import favoritesRouter from './favorites';
// import packsRouter from './packs';

import healthCheck from './healthCheck';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/sessions', sessionsRouter);
publicRouter.use('/users', usersRouter);
publicRouter.use('/wallets', walletsRouter);
publicRouter.use('/favorites', favoritesRouter);
// publicRouter.use('/packs', packsRouter);
publicRouter.get('', healthCheck);

export default publicRouter;
