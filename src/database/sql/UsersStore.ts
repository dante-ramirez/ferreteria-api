import User from '../../entities/User';
import Wallet from '../../entities/Wallet';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import WalletsStore from './WalletsStore';
import UsersStore from '../generic/UsersStore';
import {
  Pagination as _Pagination,
  UsersFilters as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLUsersStore extends UsersStore {
  constructor(connection: any, table: string) {
    super(connection, table);
    this.wallet = new WalletsStore(connection, 'wallet');
  }

  async create(user: User): Promise<User> {
    try {
      const [newUser] = await this.connection(this.table)
        .insert({
          name: user.name,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role
          // mercado_pago_id: user.mercadoPagoId,
        })
        .returning('*');

      return this.formatUser(newUser);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(user);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const timestamp = new Date();
      const [userUpdated] = await this.connection(this.table)
        .where('id', user.id)
        .update({
          name: user.name,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
          updated_at: timestamp
        })
        .returning('*');

      return this.formatUser(userUpdated);
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

  async getById(id: number): Promise<User> {
    let user: any;

    try {
      [user] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`user with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!user) {
      throw new ItemNotFound(`user with id ${id} `);
    }

    return this.formatUser(user);
  }

  async getByEmail(email: string): Promise<User> {
    let user: any;

    try {
      [user] = await this.connection(this.table)
        .select('*')
        .where('email', email);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!user) {
      throw new ItemNotFound(`user with email ${email}`);
    }

    return this.formatUser(user);
  }

  async get(filters: _Filters, pagination: _Pagination): Promise<User[]> {
    let users: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      users = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!users.length) {
      throw new ItemNotFound(this.table);
    }

    return users.map((user: any) => this.softFormatUser(user));
  }

  async suspend(id: number): Promise<User> {
    try {
      const timestamp = new Date();
      const [user] = await this.connection(this.table)
        .where('id', id)
        .update({
          suspended: true,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatUser(user);
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

  // async delete(id: number): Promise<boolean> {
  //   try {
  //     await this.connection(this.table)
  //       .where('id', id)
  //       .del();

  //     return true;
  //   } catch (error) {
  //     throw new SQLDatabaseError(error);
  //   }
  // }

  async verifyById(id: number): Promise<User> {
    let userUpdated: any;

    try {
      const timestamp = new Date();

      [userUpdated] = await this.connection(this.table)
        .where('id', id)
        .update({
          verified: true,
          updated_at: timestamp
        })
        .returning('*');
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      throw new SQLDatabaseError(error);
    }

    if (!userUpdated) {
      throw new ItemNotFound(`user with id ${id}`);
    }

    return this.formatUser(userUpdated);
  }

  private async formatUser(user: any): Promise<User> {
    let wallet: Wallet;

    try {
      wallet = await this.wallet.getByUserId(user.id);
    } catch (error) {
      if (error instanceof ItemNotFound) {
        wallet = new Wallet(0, 0, 0, 0);
      } else {
        throw error;
      }
    }

    return new User(
      Number(user.id),
      user.name,
      user.last_name,
      user.email,
      user.password,
      user.role,
      // user.mercado_pago_id,
      user.verified,
      user.suspended,
      wallet
    );
  }

  private softFormatUser(user: any): User {
    return new User(
      Number(user.id),
      user.name,
      user.last_name,
      user.email,
      user.password,
      user.role,
      // user.mercado_pago_id,
      user.verified,
      user.suspended,
      new Wallet(0, 0, 0, 0)
    );
  }
}
