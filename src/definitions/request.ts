/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import _usersStore from '../database/generic/UsersStore';
import _departmentsStore from '../database/generic/DepartmentsStore';
import _categoriesStore from '../database/generic/CategoriesStore';
import _brandsStore from '../database/generic/BrandsStore';
import _walletsStore from '../database/generic/WalletsStore';

import { userRole as _userRole } from '../entities/User';
// import { departmentRole as _departmentRole } from '../entities/departments';

export default interface Request {
  database: {
    users: _usersStore,
    departments: _departmentsStore,
    categories: _categoriesStore,
    brands: _brandsStore
    wallet: _walletsStore
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
