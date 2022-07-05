/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
import _departmentsStore from '../database/generic/DepartmentsStore';
import _categoriesStore from '../database/generic/CategoryStore';
import _brandsStore from '../database/generic/BrandStore';

// import _productsStore from '../database/generic/ProductsStore';
// import _packsStore from '../database/generic/PacksStore';
import { userRole as _userRole } from '../entities/User';
// import { departmentRole as _departmentRole } from '../entities/departments';

export default interface Request {
  database: {
    users: _usersStore,
    departments: _departmentsStore,
    categories: _categoriesStore,
    brands: _brandsStore
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
