import Favorite from '../../entities/Favorite';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import FavoritesStore from '../generic/FavoritesStore';
import {
  Pagination as _Pagination,
  FavoritesFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLDepartmentsStore extends FavoritesStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(favorite: Favorite): Promise<Favorite> {
    try {
      const [newFavorite] = await this.connection(this.table)
        .insert({
          user_id: favorite.user_id,
          product_id: favorite.product_id
        })
        .returning('*');

      return this.softFormatFavorite(newFavorite);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(favorite);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async getByUserId(userId: number): Promise<Favorite> {
    let favorite: any;

    try {
      [favorite] = await this.connection(this.table)
        .select('*')
        .where('user_id', userId);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`favorite with user id ${userId} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!favorite) {
      throw new ItemNotFound(`favorite with user id ${userId} `);
    }

    return this.softFormatFavorite(favorite);
  }

  async getByID(id: number): Promise<Favorite> {
    let favorite: any;

    try {
      [favorite] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`favorite with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!favorite) {
      throw new ItemNotFound(`favorite with id ${id} `);
    }

    return this.softFormatFavorite(favorite);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Favorite[]> {
    let favorites: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      favorites = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!favorites.length) {
      throw new ItemNotFound(this.table);
    }

    return favorites.map((favorite: any) => this.softFormatFavorite(favorite));
  }

  private softFormatFavorite(favorite: any): Favorite {
    return new Favorite(
      Number(favorite.id),
      Number(favorite.user_id),
      Number(favorite.product_id)
    );
  }
}
