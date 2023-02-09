import IndividualOffer from '../../entities/IndividualOffer';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import IndividualOffersStore from '../generic/IndividualOffersStore';
import {
  Pagination as _Pagination
  // IndividualOffersFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLBrandsStore extends IndividualOffersStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(individualOffer: IndividualOffer): Promise<IndividualOffer> {
    try {
      const [newIndividualOffers] = await this.connection(this.table)
        .insert({
          offers_id: individualOffer.offersId,
          begin_at: individualOffer.beginAt,
          finish_at: individualOffer.finishAt
        })
        .returning('*');

      return this.softFormatIndividualOffer(newIndividualOffers);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(individualOffer);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(individualOffer: IndividualOffer): Promise<IndividualOffer> {
    try {
      const timestamp = new Date();
      const [individualOfferUpdate] = await this.connection(this.table)
        .where('id', individualOffer.id)
        .update({
          offers_id: individualOffer.offersId,
          begin_at: individualOffer.beginAt,
          finish_at: individualOffer.finishAt,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatIndividualOffer(individualOfferUpdate);
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

  async getById(id: number): Promise<IndividualOffer> {
    let individualOffer: any;

    try {
      [individualOffer] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`individualOffer with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!individualOffer) {
      throw new ItemNotFound(`individualOffer with id ${id} `);
    }

    return this.softFormatIndividualOffer(individualOffer);
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

  async get(): Promise<IndividualOffer[]> {
    let individualOffers: any[] = [];

    try {
      individualOffers = await this.connection(this.table).select('*');
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!individualOffers.length) {
      throw new ItemNotFound(this.table);
    }

    return individualOffers.map((individualOffer: any) => this.softFormatIndividualOffer(individualOffer));
  }

  async getAllWithOffers(): Promise<IndividualOffer[]> {
    let individualOffers: any[] = [];

    try {
      individualOffers = await this.connection(this.table)
        .select('*')
        .where('offers_id', '>', 1);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!individualOffers.length) {
      throw new ItemNotFound(this.table);
    }

    return individualOffers.map((individualOffer) => this.softFormatIndividualOffer(individualOffer));
  }

  private softFormatIndividualOffer(individualOffer: any): IndividualOffer {
    return new IndividualOffer(
      Number(individualOffer.id),
      Number(individualOffer.offers_id),
      individualOffer.begin_at,
      individualOffer.finish_at
    );
  }
}
