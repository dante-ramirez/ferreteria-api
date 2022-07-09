import Brand from '../../entities/Brand';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import BrandsStore from '../generic/BrandsStore';
import {
  Pagination as _Pagination
  // UsersFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLDepartmentsStore extends BrandsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(brand: Brand): Promise<Brand> {
    try {
      const [newBrands] = await this.connection(this.table)
        .insert({
          name: brand.name,
          discount: brand.discount
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
          discount: brand.discount,
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

  async getByID(id: number): Promise<Brand> {
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

  private softFormatBrand(brand: any): Brand {
    return new Brand(
      Number(brand.id),
      brand.name,
      brand.discount
    );
  }
}
