import BaseStore from './BaseStore';
import IndividualOffer from '../../entities/IndividualOffer';
import {
  Pagination as _Pagination
  // IndividualOfferFilter as _Filters
} from '../interfaces';

export default class IndividualOffersStore extends BaseStore {
  protected connection: any;
  private individualOffer: IndividualOffer;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.individualOffer = new IndividualOffer(0, 0, '', '');
  }

  async create(_individualOffer: IndividualOffer): Promise<IndividualOffer> { return this.individualOffer; }
  async getById(_id: number): Promise<IndividualOffer> { return this.individualOffer; }
  async update(_individualOffer: IndividualOffer): Promise<IndividualOffer> { return this.individualOffer; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(): Promise<IndividualOffer[]> { return [this.individualOffer]; }
  async getAllWithOffers(): Promise<IndividualOffer[]> { return [this.individualOffer]; }
}
