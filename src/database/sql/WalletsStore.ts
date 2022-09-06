import Wallet from '../../entities/Wallet';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import WalletsStore from '../generic/WalletsStore';
import {
  Pagination as _Pagination
  // UsersFilters as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLWalletsStore extends WalletsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(wallet: Wallet): Promise<Wallet> {
    try {
      const [newWallet] = await this.connection(this.table)
        .insert({
          user_id: wallet.userId,
          points: wallet.points
        })
        .returning('*');

      return this.softFormatWallet(newWallet);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(wallet);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(wallet: Wallet): Promise<Wallet> {
    try {
      const timestamp = new Date();
      const [walletUpdated] = await this.connection(this.table)
        .where('id', wallet.id)
        .update({
          points: wallet.points,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatWallet(walletUpdated);
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

  async getByUserId(userId: number): Promise<Wallet> {
    let wallet: any;

    try {
      [wallet] = await this.connection(this.table)
        .select('*')
        .where('user_id', userId);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`wallet with user id ${userId} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!wallet) {
      throw new ItemNotFound(`wallet with user id ${userId} `);
    }

    return this.softFormatWallet(wallet);
  }

  // async getByName(name: string): Promise<Wallet> {
  //   let wallet: any;

  //   try {
  //     [wallet] = await this.connection(this.table)
  //       .select('*')
  //       .where('name', name);
  //   } catch (error) {
  //     throw new SQLDatabaseError(error);
  //   }

  //   if (!wallet) {
  //     throw new ItemNotFound(`wallet with name ${name}`);
  //   }

  //   return this.softFormatBrand(wallet);
  // }

  private softFormatWallet(wallet: any): Wallet {
    return new Wallet(
      Number(wallet.id),
      Number(wallet.user_id),
      wallet.points
    );
  }
}
