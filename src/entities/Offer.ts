export type offerType = 'brand' | 'department' | 'category' | 'product';

export default class Offer {
  id: number;
  name: string;
  discount: number;
  type: string;
  finish_at: string;

  constructor(
    id: number,
    name: string,
    discount: number,
    type: string,
    finishAt: string
  ) {
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.type = type;
    this.finish_at = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      discount: this.discount,
      type: this.type,
      finish_at: this.finish_at
    };
  }
}
