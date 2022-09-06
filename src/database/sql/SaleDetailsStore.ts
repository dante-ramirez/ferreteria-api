import SaleDetail from '../../entities/SaleDetail';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import SaleDetailsStore from '../generic/SaleDetailsStore';
import {
  Pagination as _Pagination,
  SaleDetailsFilters as _Filter
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
  async create(saleDetail: SaleDetail): Promise<SaleDetail> {
    try {
      const [newSaleDetail] = await this.connection(this.table)
        .insert({
          sales_id: saleDetail.salesId,
          product_id: saleDetail.productId,
          sale_price: saleDetail.salePrice,
          quantity: saleDetail.quantity,
          amount: saleDetail.amount
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
          sales_id: saleDetail.salesId,
          product_id: saleDetail.productId,
          sale_price: saleDetail.salePrice,
          quantity: saleDetail.quantity,
          amount: saleDetail.amount,
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

  async getBySalesId(id: number): Promise<SaleDetail[]> {
    let saleDetails: any[] = [];

    try {
      saleDetails = await this.connection(this.table)
        .select('*')
        .where('sales_id', id);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!saleDetails.length) {
      throw new ItemNotFound(this.table);
    }

    return saleDetails.map((saleDetail: any) => this.softFormatSaleDetail(saleDetail));
  }

  async get(filter: _Filter, pagination: _Pagination): Promise<SaleDetail[]> {
    let saleDetails: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filter);
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
      Number(saleDetail.sales_id),
      Number(saleDetail.product_id),
      saleDetail.sale_price,
      Number(saleDetail.quantity),
      saleDetail.amount
    );
  }
}
