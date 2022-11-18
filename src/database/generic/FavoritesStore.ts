import BaseStore from './BaseStore';
import Favorite from '../../entities/Favorite';
import FavoriteProduct from '../../entities/FavoriteProduct';
import _Product from '../../entities/Product';
import Product from './ProductsStore';
import {
  Pagination as _Pagination,
  FavoritesFilter as _Filters
} from '../interfaces';

export default class FavoritesStore extends BaseStore {
  protected connection: any;
  private favorite: Favorite;
  private favoriteProduct: FavoriteProduct;
  public products: Product;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.favorite = new Favorite(0, 0, 0);
    // eslint-disable-next-line max-len
    this.favoriteProduct = new FavoriteProduct(0, 0, new _Product(0, '', '', 0, '', 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0));
    this.products = new Product(connection, 'products');
  }

  async create(_favorite: Favorite): Promise<Favorite> { return this.favorite; }
  async getByUserId(_userId: number): Promise<Favorite> { return this.favorite; }
  async getById(_id: number): Promise<Favorite> { return this.favorite; }
  async update(_favorite: Favorite): Promise<Favorite> { return this.favorite; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<FavoriteProduct[]> { return [this.favoriteProduct]; }
}
