import Product from '../../entities/Product';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import ProductsStore from '../generic/ProductsStore';
import {
  Pagination as _Pagination,
  ProductsFilters as _ProductsFilters,
  RelatedProductsFilters as _RelatedProductsFilters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLProductsStore extends ProductsStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(product: Product): Promise<Product> {
    try {
      const [newProduct] = await this.connection(this.table)
        .insert({
          name: product.name,
          details: product.details,
          stock: product.stock,
          code: product.code,
          price: product.price,
          final_price: product.finalPrice,
          reward_points: product.rewardPoints,
          model: product.model,
          image1: product.image1,
          image2: product.image2,
          image3: product.image3,
          image4: product.image4,
          department_id: product.departmentId,
          category_id: product.categoryId,
          brand_id: product.brandId,
          individualOffer_id: product.individualOfferId
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
          details: product.details,
          stock: product.stock,
          code: product.code,
          price: product.price,
          final_price: product.finalPrice,
          image1: product.image1,
          image2: product.image2,
          image3: product.image3,
          image4: product.image4,
          department_id: product.departmentId,
          category_id: product.categoryId,
          brand_id: product.brandId,
          individualOffer_id: product.individualOfferId,
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

  async getById(id: number): Promise<Product> {
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

  async getByForeignId(tableField: string, id: number): Promise<Product[]> {
    let products: any[] = [];

    try {
      products = await this.connection(this.table)
        .select('*')
        .where(tableField, id);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!products.length) {
      throw new ItemNotFound(this.table);
    }

    return products.map((product: any) => this.softFormatProduct(product));
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

  async get(filters: _ProductsFilters, pagination: _Pagination): Promise<Product[]> {
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

  async getRelatedProducts(filters: _RelatedProductsFilters, pagination: _Pagination): Promise<Product[]> {
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

  async getAll(): Promise<Product[]> {
    let products: any[] = [];

    try {
      products = await this.connection(this.table)
        .select('*');
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!products.length) {
      throw new ItemNotFound(this.table);
    }

    return products.map((product) => this.softFormatProduct(product));
  }

  private softFormatProduct(product: any): Product {
    return new Product(
      Number(product.id),
      product.name,
      product.details,
      product.stock,
      product.code,
      product.price,
      product.final_price,
      product.reward_points,
      product.model,
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      Number(product.department_id),
      Number(product.category_id),
      Number(product.brand_id),
      Number(product.individualOffer_id)
    );
  }
}
