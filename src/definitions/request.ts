/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
import _offersStore from '../database/generic/OffersStore';
import _walletsStore from '../database/generic/WalletsStore';
import _invoiceStore from '../database/generic/InvoicesStore';
import _favoritesStore from '../database/generic/FavoritesStore';
import _salesStore from '../database/generic/SalesStore';
import _saleDetailsStore from '../database/generic/SaleDetailsStore';

import { userRole as _userRole } from '../entities/User';

export default interface Request {
  database: {
    users: _usersStore,
    offers: _offersStore,
    wallet: _walletsStore,
    invoice: _invoiceStore,
    favorite: _favoritesStore,
    sale: _salesStore,
    saleDetail: _saleDetailsStore
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
