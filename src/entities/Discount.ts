import _Offer from './Offer';

export default class Discount {
  id: number;
  name: string;
  offer: _Offer;
  beginAt: string;
  finishAt: string;

  constructor(
    id: number,
    name: string,
    offer: _Offer,
    beginAt: string,
    finishAt: string
  ) {
    this.id = id;
    this.name = name;
    this.offer = offer;
    this.beginAt = beginAt;
    this.finishAt = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      offer: this.offer.serialize(),
      beginAt: this.beginAt,
      finishAt: this.finishAt
    };
  }
}
