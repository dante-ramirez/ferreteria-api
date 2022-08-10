import BaseStore from './BaseStore';
import Favorite from '../../entities/Favorite';
import {
  Pagination as _Pagination,
  FavoritesFilter as _Filters
} from '../interfaces';

export default class FavoritesStore extends BaseStore {
  protected connection: any;
  private favorite: Favorite;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.favorite = new Favorite(0, 0, 0);
  }

  async create(_favorite: Favorite): Promise<Favorite> { return this.favorite; }
  async getByUserId(_userId: number): Promise<Favorite> { return this.favorite; }
  async getByID(_id: number): Promise<Favorite> { return this.favorite; }
  async update(_favorite: Favorite): Promise<Favorite> { return this.favorite; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Favorite[]> { return [this.favorite]; }
}
