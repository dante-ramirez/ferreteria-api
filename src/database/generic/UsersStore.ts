import BaseStore from './BaseStore';
import WalletsStore from './WalletsStore';
// import UsersCardsStore from './UsersCardsStore';
import User from '../../entities/User';
import Wallet from '../../entities/Wallet';
import {
  Pagination as _Pagination,
  UsersFilters as _Filters
} from '../interfaces';

export default class UsersStore extends BaseStore {
  protected connection: any;
  public wallet: WalletsStore;
  // public cards: UsersCardsStore
  private user: User;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.wallet = new WalletsStore(connection, 'wallet');
    // this.cards = new UsersCardsStore(connection, 'users_cards');
    this.user = new User(0, '', '', '', '', 'client', false, false, new Wallet(-1, -1, -1, -1));
  }

  async create(_user: User): Promise<User> { return this.user; }
  async getById(_id: number): Promise<User> { return this.user; }
  async getByEmail(_email: string): Promise<User> { return this.user; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<User[]> { return [this.user]; }
  async update(_user: User): Promise<User> { return this.user; }
  async suspend(_id: number, _isSuspended: boolean): Promise<User> { return this.user; }
  // async delete(_id: number): Promise<boolean> { return true; }
  async verifyById(_id: number): Promise<User> { return this.user; }
}
