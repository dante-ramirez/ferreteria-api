/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
// import _productsStore from '../database/generic/ProductsStore';
// import _packsStore from '../database/generic/PacksStore';
import { userRole as _userRole } from '../entities/User';

export default interface Request {
  database: {
    users: _usersStore
    // products: _productsStore
    // packs: _packsStore
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
