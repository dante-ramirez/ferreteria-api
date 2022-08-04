import Product from '../../entities/Product';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import ProductsStore from '../generic/ProductsStore';
import {
  Pagination as _Pagination,
  ProductsFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLDepartmentsStore extends ProductsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(product: Product): Promise<Product> {
    try {
      const [newProduct] = await this.connection(this.table)
        .insert({
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          code: product.code,
          discount: product.discount,
          reward_points: product.reward_points,
          model: product.model,
          path_image1: product.path_image1,
          path_image2: product.path_image2,
          path_image3: product.path_image3,
          path_image4: product.path_image4,
          department_id: product.department_id,
          category_id: product.category_id,
          brand_id: product.brand_id,
          offers_id: product.offers_id
        })
        .returning('*');

      return this.softFormatProduct(newProduct);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(product);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const timestamp = new Date();
      const [productUpdated] = await this.connection(this.table)
        .where('id', product.id)
        .update({
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          code: product.code,
          discount: product.discount,
          reward_points: product.reward_points,
          model: product.model,
          path_image1: product.path_image1,
          path_image2: product.path_image2,
          path_image3: product.path_image3,
          path_image4: product.path_image4,
          department_id: product.department_id,
          category_id: product.category_id,
          brand_id: product.brand_id,
          offers_id: product.offers_id,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatProduct(productUpdated);
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

  async getByID(id: number): Promise<Product> {
    let product: any;

    try {
      [product] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`product with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!product) {
      throw new ItemNotFound(`product with id ${id} `);
    }

    return this.softFormatProduct(product);
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

  async get(filters: _Filters, pagination: _Pagination): Promise<Product[]> {
    let products: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      products = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!products.length) {
      throw new ItemNotFound(this.table);
    }

    return products.map((product: any) => this.softFormatProduct(product));
  }

  private softFormatProduct(product: any): Product {
    return new Product(
      Number(product.id),
      product.name,
      product.description,
      product.stock,
      product.price,
      product.code,
      product.discount,
      product.reward_points,
      product.model,
      product.path_image1,
      product.path_image2,
      product.path_image3,
      product.path_image4,
      Number(product.department_id),
      Number(product.category_id),
      Number(product.brand_id),
      Number(product.offers_id)
    );
  }
}
