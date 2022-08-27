export default class Offer {
  id: number;
  discount: number;

  constructor(
    id: number,
    discount: number
  ) {
    this.id = id;
    this.discount = discount;
  }

  serialize() {
    return {
      id: this.id,
      discount: this.discount
    };
  }
}
