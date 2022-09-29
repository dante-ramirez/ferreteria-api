import Sale from '../../entities/Sale';
import SaleDetail from '../../entities/SaleDetail';
import Ticket from '../../entities/Ticket';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import SalesStore from '../generic/SalesStore';
import SaleDetailsStore from './SaleDetailsStore';
import {
  Pagination as _Pagination,
  SalesFilters as _SalesFilters,
  PurchasesFilters as _PurchasesFilters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLSalesStore extends SalesStore {
  constructor(connection: any, table: string) {
    super(connection, table);
    this.saleDetails = new SaleDetailsStore(connection, 'sale_detail');
  }

  async create(sale: Sale): Promise<Sale> {
    try {
      const [newSale] = await this.connection(this.table)
        .insert({
          code: sale.code,
          user_id: sale.userId,
          date: sale.date,
          subtotal: sale.subtotal,
          discount_points: sale.discountPoints,
          total: sale.total,
          status: sale.status,
          request: sale.request
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
      const [saleUpdated] = await this.connection(this.table)
        .where('id', sale.id)
        .update({
          status: sale.status,
          request: sale.request,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatSale(saleUpdated);
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

  async getById(id: number): Promise<Sale> {
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

  async get(filters: _SalesFilters, pagination: _Pagination): Promise<Ticket[]> {
    let sales: any[] = [];
    const tickets: any[] = [];

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

    Promise.all(sales.map(async (sale: any) => {
      let detail: any[];

      try {
        detail = await this.saleDetails.getBySalesId(sale.id);
      } catch (error) {
        if (error instanceof ItemNotFound) {
          detail = [new SaleDetail(0, 0, 0, 0, 0, 0)];
        } else {
          throw error;
        }
      }

      const ticket = new Ticket(
        Number(sale.id),
        Number(sale.user_id),
        sale.code,
        sale.date,
        sale.subtotal,
        sale.discount_points,
        sale.total,
        sale.status,
        sale.request,
        detail
      );

      tickets.push(ticket);
    }));

    return tickets;
  }

  async getPurchases(filters: _PurchasesFilters, pagination: _Pagination): Promise<Ticket[]> {
    let sales: any[] = [];
    const tickets: any[] = [];

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

    Promise.all(sales.map(async (sale: any) => {
      let detail: any[];

      try {
        detail = await this.saleDetails.getBySalesId(sale.id);
      } catch (error) {
        if (error instanceof ItemNotFound) {
          detail = [new SaleDetail(0, 0, 0, 0, 0, 0)];
        } else {
          throw error;
        }
      }

      const ticket = new Ticket(
        Number(sale.id),
        Number(sale.user_id),
        sale.code,
        sale.date,
        sale.subtotal,
        sale.discount_points,
        sale.total,
        sale.status,
        sale.request,
        detail
      );

      tickets.push(ticket);
    }));

    return tickets;
  }

  private softFormatSale(sale: any): Sale {
    return new Sale(
      Number(sale.id),
      Number(sale.user_id),
      sale.code,
      sale.date,
      sale.subtotal,
      sale.discount_points,
      sale.total,
      sale.status,
      sale.request
    );
  }
}
