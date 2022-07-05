import Category from '../../entities/categories';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import CategoriesStore from '../generic/CategoryStore';
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

export default class SQLDepartmentsStore extends CategoriesStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(category: Category): Promise<Category> {
    try {
      const [newCategories] = await this.connection(this.table)
        .insert({
          name: category.name,
          discount: category.discount
        })
        .returning('*');

      return this.softFormatCategory(newCategories);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(category);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(category: Category): Promise<Category> {
    try {
      const timestamp = new Date();
      const [categoryUpdate] = await this.connection(this.table)
        .where('id', category.id)
        .update({
          name: category.name,
          discount: category.discount,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatCategory(categoryUpdate);
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

  async getByID(id: number): Promise<Category> {
    let category: any;

    try {
      [category] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`category with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!category) {
      throw new ItemNotFound(`category with id ${id} `);
    }

    return this.softFormatCategory(category);
  }

  async getByName(name: string): Promise<Category> {
    let category: any;

    try {
      [category] = await this.connection(this.table)
        .select('*')
        .where('name', name);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!category) {
      throw new ItemNotFound(`category with name ${name}`);
    }

    return this.softFormatCategory(category);
  }

  private softFormatCategory(category: any): Category {
    return new Category(
      Number(category.id),
      category.name,
      category.discount
    );
  }
}
