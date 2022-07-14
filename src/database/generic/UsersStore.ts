import BaseStore from './BaseStore';
// import UsersPacksStore from './UsersPacksStore';
// import UsersCardsStore from './UsersCardsStore';
import User from '../../entities/User';
// import UserPack from '../../entities/UserPack';
import {
  Pagination as _Pagination,
  UsersFilter as _Filters
} from '../interfaces';

export default class UsersStore extends BaseStore {
  protected connection: any;
  // public packs: UsersPacksStore
  // public cards: UsersCardsStore
  private user: User;

  constructor(connection: any, table: string) {
    super(connection, table);
    // this.packs = new UsersPacksStore(connection, 'users_packs');
    // this.cards = new UsersCardsStore(connection, 'users_cards');
    this.user = new User(0, '', '', '', '', 'client', false, false);
  }

  async create(_user: User): Promise<User> { return this.user; }
  async getByID(_id: number): Promise<User> { return this.user; }
  async getByEmail(_email: string): Promise<User> { return this.user; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<User[]> { return [this.user]; }
  async update(_user: User): Promise<User> { return this.user; }
  async suspend(_id: number): Promise<User> { return this.user; }
  // async delete(_id: number): Promise<boolean> { return true; }
  // async verifyById(_id: number): Promise<User> { return this.user; }
}
