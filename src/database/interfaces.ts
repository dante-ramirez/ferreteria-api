interface _Filter {
  value: any,
  type: 'like' | 'match'
}

export interface Pagination {
  limit: number,
  offset: number
}

// export interface UsersFilter {
//   name: Filter,
//   lastName: Filter
// }

// export interface ProductsFilter {
//   description: Filter,
//   userId: Filter
// }

// export interface PacksFilter {
//   filter: Filter
// }
