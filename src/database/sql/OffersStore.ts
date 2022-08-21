import Offer from '../../entities/Offer';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import OffersStore from '../generic/OffersStore';
import {
  Pagination as _Pagination,
  OffersFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLOffersStore extends OffersStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(offer: Offer): Promise<Offer> {
    try {
      const [newOffer] = await this.connection(this.table)
        .insert({
          name: offer.name,
          discount: offer.discount,
          type: offer.type,
          finish_at: offer.finishAt
        })
        .returning('*');

      return this.softFormatOffer(newOffer);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(offer);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(offer: Offer): Promise<Offer> {
    try {
      const timestamp = new Date();
      const [offerUpdate] = await this.connection(this.table)
        .where('id', offer.id)
        .update({
          name: offer.name,
          discount: offer.discount,
          type: offer.type,
          finish_at: offer.finishAt,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatOffer(offerUpdate);
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

  async getById(id: number): Promise<Offer> {
    let offer: any;

    try {
      [offer] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`offer with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!offer) {
      throw new ItemNotFound(`offer with id ${id} `);
    }

    return this.softFormatOffer(offer);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Offer[]> {
    let offers: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      offers = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!offers.length) {
      throw new ItemNotFound(this.table);
    }

    return offers.map((offer: any) => this.softFormatOffer(offer));
  }

  private softFormatOffer(offer: any): Offer {
    return new Offer(
      Number(offer.id),
      offer.name,
      offer.discount,
      offer.type,
      offer.finish_at
    );
  }
}
