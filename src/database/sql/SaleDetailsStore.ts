import SaleDetail from '../../entities/saleDetail';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import SaleDetailsStore from '../generic/SaleDetailsStore';
import {
  Pagination as _Pagination,
  SaleDetailsFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLSaleDetailsStore extends SaleDetailsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(saleDetail: SaleDetail): Promise<SaleDetail> {
    try {
      const [newSaleDetail] = await this.connection(this.table)
        .insert({
          amount: saleDetail.amount,
          sale_price: saleDetail.sale_price,
          sales_id: saleDetail.sales_id,
          product_id: saleDetail.product_id
        })
        .returning('*');

      return this.softFormatSaleDetail(newSaleDetail);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(saleDetail);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(saleDetail: SaleDetail): Promise<SaleDetail> {
    try {
      const timestamp = new Date();
      const [offerUpdate] = await this.connection(this.table)
        .where('id', saleDetail.id)
        .update({
          amount: saleDetail.amount,
          sale_price: saleDetail.sale_price,
          sales_id: saleDetail.sales_id,
          product_id: saleDetail.product_id,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatSaleDetail(offerUpdate);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      throw new SQLDatabaseError(error);
    }
  }

  async getById(id: number): Promise<SaleDetail> {
    let saleDetail: any;

    try {
      [saleDetail] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`saleDetail with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!saleDetail) {
      throw new ItemNotFound(`saleDetail with id ${id} `);
    }

    return this.softFormatSaleDetail(saleDetail);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.connection(this.table)
        .where('id', id)
        .del();

      return true;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }
  }

  async get(filters: _Filters, pagination: _Pagination): Promise<SaleDetail[]> {
    let saleDetails: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      saleDetails = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!saleDetails.length) {
      throw new ItemNotFound(this.table);
    }

    return saleDetails.map((saleDetail: any) => this.softFormatSaleDetail(saleDetail));
  }

  private softFormatSaleDetail(saleDetail: any): SaleDetail {
    return new SaleDetail(
      Number(saleDetail.id),
      saleDetail.amount,
      saleDetail.sale_price,
      Number(saleDetail.sales_id),
      Number(saleDetail.product_id)
    );
  }
}
