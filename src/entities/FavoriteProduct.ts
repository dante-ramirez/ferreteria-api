import _Product from './Product';

export default class FavoriteProduct {
  id: number;
  userId: number;
  product: _Product;

  constructor(
    id: number,
    userId: number,
    product: _Product
  ) {
    this.id = id;
    this.userId = userId;
    this.product = product;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      product: this.product.serialize()
    };
  }
}
