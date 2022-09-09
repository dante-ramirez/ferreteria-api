import Invoice from '../../entities/Invoice';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import InvoicesStore from '../generic/InvoicesStore';
import {
  Pagination as _Pagination,
  InvoicesFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLInvoicesStore extends InvoicesStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(invoice: Invoice): Promise<Invoice> {
    try {
      const [newInvoice] = await this.connection(this.table)
        .insert({
          path: invoice.path,
          user_id: invoice.userId,
          sales_id: invoice.salesId
        })
        .returning('*');

      return this.softFormatInvoice(newInvoice);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(invoice);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(invoice: Invoice): Promise<Invoice> {
    try {
      const timestamp = new Date();
      const [invoiceUpdated] = await this.connection(this.table)
        .where('id', invoice.id)
        .update({
          path: invoice.path,
          user_id: invoice.userId,
          sales_id: invoice.salesId,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatInvoice(invoiceUpdated);
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

  async getByUserId(userId: number): Promise<Invoice> {
    let invoice: any;

    try {
      [invoice] = await this.connection(this.table)
        .select('*')
        .where('user_id', userId);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`invoice with user id ${userId} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!invoice) {
      throw new ItemNotFound(`invoice with user id ${userId} `);
    }

    return this.softFormatInvoice(invoice);
  }

  async getById(id: number): Promise<Invoice> {
    let invoice: any;

    try {
      [invoice] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`invoice with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!invoice) {
      throw new ItemNotFound(`invoice with id ${id} `);
    }

    return this.softFormatInvoice(invoice);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Invoice[]> {
    let invoices: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      invoices = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!invoices.length) {
      throw new ItemNotFound(this.table);
    }

    return invoices.map((invoice: any) => this.softFormatInvoice(invoice));
  }

  private softFormatInvoice(invoice: any): Invoice {
    return new Invoice(
      Number(invoice.id),
      invoice.path,
      Number(invoice.user_id),
      Number(invoice.sales_id)
    );
  }
}
