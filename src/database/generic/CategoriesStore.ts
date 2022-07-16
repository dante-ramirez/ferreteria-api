import BaseStore from './BaseStore';
import Category from '../../entities/Category';
import {
  Pagination as _Pagination,
  CategoriesFilter as _Filters
} from '../interfaces';

export default class CategoriesStore extends BaseStore {
  protected connection: any;
  private category: Category;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.category = new Category(0, '', 0);
  }

  async create(_category: Category): Promise<Category> { return this.category; }
  async getByID(_id: number): Promise<Category> { return this.category; }
  async getByName(_name: string): Promise<Category> { return this.category; }
  async update(_category: Category): Promise<Category> { return this.category; }
  async delete(_id: number): Promise<boolean> { return true; }
  // eslint-disable-next-line max-len
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Category[]> { return [this.category]; }
}
