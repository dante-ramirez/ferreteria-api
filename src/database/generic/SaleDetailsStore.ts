import BaseStore from './BaseStore';
import SaleDetail from '../../entities/SaleDetail';
import {
  Pagination as _Pagination,
  SaleDetailsFilters as _Filter
} from '../interfaces';

export default class SaleDetailsStore extends BaseStore {
  protected connection: any;
  private saleDetail: SaleDetail;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.saleDetail = new SaleDetail(0, 0, 0, 0, 0, 0);
  }

  async create(_saleDetail: SaleDetail): Promise<SaleDetail> { return this.saleDetail; }
  async getById(_id: number): Promise<SaleDetail> { return this.saleDetail; }
  async update(_saleDetail: SaleDetail): Promise<SaleDetail> { return this.saleDetail; }
  async delete(_id: number): Promise<boolean> { return true; }
  async getBySalesId(_id: number): Promise<SaleDetail[]> { return [this.saleDetail]; }
  async get(_filter: _Filter, _pagination: _Pagination): Promise<SaleDetail[]> { return [this.saleDetail]; }
}
