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
import _productsStore from '../database/generic/ProductsStore';
import _surveysStore from '../database/generic/SurveysStore';

import { userRole as _userRole } from '../entities/User';

export default interface Request {
  database: {
    users: _usersStore
    offers: _offersStore
    departments: _departmentsStore
    categories: _categoriesStore
    brands: _brandsStore
    wallets: _walletsStore
    invoices: _invoiceStore
    favorites: _favoritesStore
    sales: _salesStore
    saleDetails: _saleDetailsStore
    products: _productsStore
    surveys: _surveysStore
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
