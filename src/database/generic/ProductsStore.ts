import BaseStore from './BaseStore';
import Product from '../../entities/Product';
import {
  Pagination as _Pagination,
  ProductsFilter as _Filters
} from '../interfaces';

export default class ProductsStore extends BaseStore {
  protected connection: any;
  private product: Product;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.product = new Product(0, '', '', 0, 0, '', 0, 0, '', '', '', '', '', 0, 0, 0);
  }

  async create(_product: Product): Promise<Product> { return this.product; }
  async getByUserId(_userId: number): Promise<Product> { return this.product; }
  async getById(_id: number): Promise<Product> { return this.product; }
  async update(_product: Product): Promise<Product> { return this.product; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Product[]> { return [this.product]; }
}
