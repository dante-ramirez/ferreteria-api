/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
import _offersStore from '../database/generic/OffersStore';
import _walletsStore from '../database/generic/WalletsStore';

import { userRole as _userRole } from '../entities/User';

export default interface Request {
  database: {
    users: _usersStore,
    offers: _offersStore
    wallet: _walletsStore
  },
  user: {
    id: number,
    role: _userRole,
    email: string
  }
  body: any,
  params: any,
  query: any
};
