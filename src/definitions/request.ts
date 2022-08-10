/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
import _offersStore from '../database/generic/OffersStore';
import _departmentsStore from '../database/generic/DepartmentsStore';
import _categoriesStore from '../database/generic/CategoriesStore';
import _brandsStore from '../database/generic/BrandsStore';
import _walletsStore from '../database/generic/WalletsStore';
import _invoiceStore from '../database/generic/InvoicesStore';
import _favoritesStore from '../database/generic/FavoritesStore';
import _salesStore from '../database/generic/SalesStore';
import _saleDetailsStore from '../database/generic/SaleDetailsStore';
import _ProductsStore from '../database/generic/ProductsStore';

import { userRole as _userRole } from '../entities/User';

export default interface Request {
  database: {
    users: _usersStore
    offers: _offersStore
    departments: _departmentsStore
    categories: _categoriesStore
    brands: _brandsStore
    wallet: _walletsStore
    invoice: _invoiceStore
    favorite: _favoritesStore
    sale: _salesStore
    saleDetail: _saleDetailsStore
    product: _ProductsStore
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
