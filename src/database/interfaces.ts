interface Filter {
  value: any,
  type: 'like' | 'match'
}

export interface Pagination {
  limit: number,
  offset: number
}

export interface UsersFilters {
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

export interface SalesFilters{
  id: Filter,
  date: Filter,
  status: Filter
}

export interface SaleDetailsFilters{
  id: Filter,
  salesId: Filter,
  productId: Filter
}

export interface ProductsFilters{
  name: Filter,
  description: Filter,
  code: Filter,
  model: Filter
}
