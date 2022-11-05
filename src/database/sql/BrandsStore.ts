import Brand from '../../entities/Brand';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import BrandsStore from '../generic/BrandsStore';
import {
  Pagination as _Pagination,
  BrandsFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLBrandsStore extends BrandsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(brand: Brand): Promise<Brand> {
    try {
      const [newBrands] = await this.connection(this.table)
        .insert({
          name: brand.name,
          offers_id: brand.offersId,
          begin_at: brand.beginAt,
          finish_at: brand.finishAt
        })
        .returning('*');

      return this.softFormatBrand(newBrands);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(brand);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(brand: Brand): Promise<Brand> {
    try {
      const timestamp = new Date();
      const [brandUpdate] = await this.connection(this.table)
        .where('id', brand.id)
        .update({
          name: brand.name,
          offers_id: brand.offersId,
          begin_at: brand.beginAt,
          finish_at: brand.finishAt,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatBrand(brandUpdate);
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

  async getById(id: number): Promise<Brand> {
    let brand: any;

    try {
      [brand] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`brand with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!brand) {
      throw new ItemNotFound(`brand with id ${id} `);
    }

    return this.softFormatBrand(brand);
  }

  async getByName(name: string): Promise<Brand> {
    let brand: any;

    try {
      [brand] = await this.connection(this.table)
        .select('*')
        .where('name', name);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!brand) {
      throw new ItemNotFound(`brand with name ${name}`);
    }

    return this.softFormatBrand(brand);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Brand[]> {
    let brands: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      brands = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!brands.length) {
      throw new ItemNotFound(this.table);
    }

    return brands.map((brand: any) => this.softFormatBrand(brand));
  }

  async getAllWithOffers(): Promise<Brand[]> {
    let brands: any[] = [];

    try {
      brands = await this.connection(this.table)
        .select('*')
        .where('offers_id', '>', 1);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!brands.length) {
      throw new ItemNotFound(this.table);
    }

    return brands.map((brand) => this.softFormatBrand(brand));
  }

  private softFormatBrand(brand: any): Brand {
    return new Brand(
      Number(brand.id),
      brand.name,
      Number(brand.offers_id),
      brand.begin_at,
      brand.finish_at
    );
  }
}
