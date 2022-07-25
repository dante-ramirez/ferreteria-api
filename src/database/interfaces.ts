interface Filter {
  value: any,
  type: 'like' | 'match'
}

export interface Pagination {
  limit: number,
  offset: number
}

export interface UsersFilter {
  name: Filter,
  lastName: Filter
}

export interface BrandsFilter {
  name: Filter
}

export interface DepartmentsFilter {
  name: Filter
}

export interface CategoriesFilter {
  name: Filter
}

export interface OffersFilter {
  name: Filter
}

// export interface ProductsFilter {
//   description: Filter,
//   userId: Filter
// }

// export interface PacksFilter {
//   filter: Filter
// }
