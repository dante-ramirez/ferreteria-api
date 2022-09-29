import BaseStore from './BaseStore';
import Sale from '../../entities/Sale';
import Ticket from '../../entities/Ticket';
import Detail from '../../entities/SaleDetail';
import SaleDetail from './SaleDetailsStore';
import {
  Pagination as _Pagination,
  SalesFilters as _SalesFilters,
  PurchasesFilters as _PurchasesFilters
} from '../interfaces';

export default class SalesStore extends BaseStore {
  protected connection: any;
  private sale: Sale;
  public saleDetails: SaleDetail;
  public ticket: Ticket;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.sale = new Sale(0, 0, '', '', 0, 0, 0, 'pending', false);
    this.saleDetails = new SaleDetail(connection, 'sale_detail');
    this.ticket = new Ticket(0, 0, '', '', 0, 0, 0, 'pending', false, [new Detail(0, 0, 0, 0, 0, 0)]);
  }

  async create(_sale: Sale): Promise<Sale> { return this.sale; }
  async getById(_id: number): Promise<Sale> { return this.sale; }
  async update(_sale: Sale): Promise<Sale> { return this.sale; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _SalesFilters, _pagination: _Pagination): Promise<Ticket[]> { return [this.ticket]; }
  async getPurchases(_filters: _PurchasesFilters, _pagination: _Pagination): Promise<Ticket[]> { return [this.ticket]; }
  async getInvoiceRequests(_pagination: _Pagination): Promise<Ticket[]> { return [this.ticket]; }
}
