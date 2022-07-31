import Sale from '../../entities/sale';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import SalesStore from '../generic/SalesStore';
import {
  Pagination as _Pagination,
  SalesFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLDepartmentsStore extends SalesStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(sale: Sale): Promise<Sale> {
    try {
      const [newSale] = await this.connection(this.table)
        .insert({
          code: sale.code,
          date: sale.date,
          total: sale.total,
          subtotal: sale.subtotal,
          user_id: sale.user_id
        })
        .returning('*');

      return this.softFormatSale(newSale);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(sale);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(sale: Sale): Promise<Sale> {
    try {
      const timestamp = new Date();
      const [saleUpdate] = await this.connection(this.table)
        .where('id', sale.id)
        .update({
          code: sale.code,
          date: sale.date,
          total: sale.total,
          subtotal: sale.subtotal,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatSale(saleUpdate);
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

  async getByID(id: number): Promise<Sale> {
    let sale: any;

    try {
      [sale] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`sale with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!sale) {
      throw new ItemNotFound(`sale with id ${id} `);
    }

    return this.softFormatSale(sale);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Sale[]> {
    let sales: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      sales = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!sales.length) {
      throw new ItemNotFound(this.table);
    }

    return sales.map((sale: any) => this.softFormatSale(sale));
  }

  private softFormatSale(sale: any): Sale {
    return new Sale(
      Number(sale.id),
      sale.code,
      sale.date,
      sale.total,
      sale.subtotal,
      Number(sale.user_id)
    );
  }
}
