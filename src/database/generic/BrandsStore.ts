import BaseStore from './BaseStore';
import Brand from '../../entities/Brand';
import {
  Pagination as _Pagination
  // UsersFilter as _Filters
} from '../interfaces';

export default class BrandsStore extends BaseStore {
  protected connection: any;
  private brand: Brand;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.brand = new Brand(0, '', 0);
  }

  async create(_brand: Brand): Promise<Brand> { return this.brand; }
  async getByID(_id: number): Promise<Brand> { return this.brand; }
  async getByName(_name: string): Promise<Brand> { return this.brand; }
  async update(_brand: Brand): Promise<Brand> { return this.brand; }
  async delete(_id: number): Promise<boolean> { return true; }
}
