import BaseStore from './BaseStore';
import Invoice from '../../entities/Invoice';
import {
  Pagination as _Pagination,
  InvoicesFilter as _Filters
} from '../interfaces';

export default class InvoicesStore extends BaseStore {
  protected connection: any;
  private invoice: Invoice;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.invoice = new Invoice(0, '', 0);
  }

  async create(_invoice: Invoice): Promise<Invoice> { return this.invoice; }
  async getByUserId(_userId: number): Promise<Invoice> { return this.invoice; }
  async getByID(_id: number): Promise<Invoice> { return this.invoice; }
  async update(_invoice: Invoice): Promise<Invoice> { return this.invoice; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Invoice[]> { return [this.invoice]; }
}
