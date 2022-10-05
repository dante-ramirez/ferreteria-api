import BaseStore from './BaseStore';
import Wallet from '../../entities/Wallet';
import {
  Pagination as _Pagination
  // UsersFilters as _Filters
} from '../interfaces';

export default class WalletsStore extends BaseStore {
  protected connection: any;
  private wallet: Wallet;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.wallet = new Wallet(0, 0, 0, 0);
  }

  async create(_wallet: Wallet): Promise<Wallet> { return this.wallet; }
  async get(): Promise<Wallet[]> { return [this.wallet]; }
  async getByUserId(_userId: number): Promise<Wallet> { return this.wallet; }
  async update(_wallet: Wallet): Promise<Wallet> { return this.wallet; }
  async enablePoints(_wallet: Wallet): Promise<Wallet> { return this.wallet; }
}
