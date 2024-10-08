export default class Favorite {
  id: number;
  userId: number;
  productId: number;

  constructor(
    id: number,
    userId: number,
    productId: number
  ) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId
    };
  }
}
