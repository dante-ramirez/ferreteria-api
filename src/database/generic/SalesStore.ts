import BaseStore from './BaseStore';
import Sale from '../../entities/sale';
import {
  Pagination as _Pagination,
  SalesFilter as _Filters
} from '../interfaces';

export default class SalesStore extends BaseStore {
  protected connection: any;
  private sale: Sale;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.sale = new Sale(0, '', '', 0, 0, 0);
  }

  async create(_sale: Sale): Promise<Sale> { return this.sale; }
  async getById(_id: number): Promise<Sale> { return this.sale; }
  async update(_sale: Sale): Promise<Sale> { return this.sale; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Sale[]> { return [this.sale]; }
}
