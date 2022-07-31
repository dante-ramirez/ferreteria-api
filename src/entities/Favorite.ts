/* eslint-disable camelcase */
export default class Favorite {
  id: number;
  user_id: number;
  product_id: number;

  constructor(
    id: number,
    user_id: number,
    product_id: number
  ) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
  }

  serialize() {
    return {
      id: this.id,
      user_id: this.user_id,
      product_id: this.product_id
    };
  }
}
