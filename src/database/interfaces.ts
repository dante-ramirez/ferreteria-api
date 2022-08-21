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

export interface InvoicesFilter{
  path: Filter
}

export interface FavoritesFilter{
  userId: Filter
}

export interface SalesFilter{
  id: Filter,
  date: Filter
}

export interface SaleDetailsFilter{
  id: Filter,
  salesId: Filter,
  productId: Filter
}

export interface ProductsFilter{
  name: Filter,
  description: Filter,
  code: Filter,
  model: Filter
}
