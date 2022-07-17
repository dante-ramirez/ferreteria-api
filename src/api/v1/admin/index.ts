import offersRouter from './offers';
import usersRouter from './users';

const express = require('express');

const adminRouter = express.Router();

adminRouter.use('/offers', offersRouter);
adminRouter.use('/users', usersRouter);

export default adminRouter;
