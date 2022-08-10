export default class Favorite {
  id: number;
  user_id: number;
  product_id: number;

  constructor(
    id: number,
    userId: number,
    productId: number
  ) {
    this.id = id;
    this.user_id = userId;
    this.product_id = productId;
  }

  serialize() {
    return {
      id: this.id,
      user_id: this.user_id,
      product_id: this.product_id
    };
  }
}
