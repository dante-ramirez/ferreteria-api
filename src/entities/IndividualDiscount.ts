import _Offer from './Offer';

export default class Discount {
  id: number;
  offer: _Offer;
  beginAt: string;
  finishAt: string;

  constructor(
    id: number,
    offer: _Offer,
    beginAt: string,
    finishAt: string
  ) {
    this.id = id;
    this.offer = offer;
    this.beginAt = beginAt;
    this.finishAt = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      offer: this.offer.serialize(),
      beginAt: this.beginAt,
      finishAt: this.finishAt
    };
  }
}
