import { Pagination as _Pagination } from '../interfaces';

export default class BaseStore {
  protected connection: any;
  protected table: string;

  constructor(connection: any, table: string) {
    this.connection = connection;
    this.table = table;
  }

  protected applyFilters(query: any, filters: any): any {
    Object.keys(filters).forEach((key: any) => {
      if (filters[key].value && filters[key].value !== '' && filters[key].value !== -1) {
        if (filters[key].type === 'like') {
          query.where(this.camelToSnakeCase(key), 'like', `%${filters[key].value}%`);
        } else if (filters[key].type === 'match') {
          query.where(this.camelToSnakeCase(key), filters[key].value);
        }
      }
    });

    return query;
  }

  protected applyPagination(query: any, pagination: _Pagination) {
    if (pagination.offset && pagination.offset > 0) {
      query.offset(pagination.offset);
    }
    if (pagination.limit && pagination.limit > 0) {
      query.limit(pagination.limit);
    }

    return query;
  }

  public async count(filters: any): Promise<number> {
    let result: any = [];
    let query: any = this.connection(this.table).count('*');

    query = this.applyFilters(query, filters);

    try {
      result = await query;
    } catch (error) {
      throw new Error(String(error)); // error
    }

    const [element = { count: 0 }] = result;
    const { count } = element;

    return Number(count);
  }

  private camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}
