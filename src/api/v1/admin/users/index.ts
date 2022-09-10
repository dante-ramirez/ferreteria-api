import authorization from '../../../../middleware/authorization';

import getUsers from './getUsers';
import getUser from './getUser';
import suspendUser from './suspendUser';

const express = require('express');

const usersRouter = express.Router();

usersRouter.get(
  '/',
  authorization(['administrator']),
  getUsers
);

usersRouter.get(
  '/:userId',
  authorization(['administrator']),
  getUser
);

usersRouter.put(
  '/:userId',
  authorization(['administrator']),
  suspendUser
);

export default usersRouter;
