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

export interface InvoicesFilter{
  filename: Filter
}

export interface FavoritesFilter{
  userId: Filter
}

export interface SalesFilters{
  id: Filter,
  date: Filter,
  status: Filter
}

export interface PurchasesFilters{
  date: Filter,
  status: Filter,
  userId: Filter
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

export interface RelatedProductsFilters{
  department_id: Filter,
  category_id: Filter,
  brand_id: Filter
}

export interface SurveysFilter{
  link: Filter
}
