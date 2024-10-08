import BaseStore from './BaseStore';
import Offer from '../../entities/Offer';
import {
  Pagination as _Pagination
} from '../interfaces';

export default class OffersStore extends BaseStore {
  protected connection: any;
  private offer: Offer;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.offer = new Offer(0, 0);
  }

  async create(_offer: Offer): Promise<Offer> { return this.offer; }
  async getById(_id: number): Promise<Offer> { return this.offer; }
  async update(_offer: Offer): Promise<Offer> { return this.offer; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(): Promise<Offer[]> { return [this.offer]; }
}
