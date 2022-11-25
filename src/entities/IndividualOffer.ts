export default class IndividualOffer {
  id: number;
  productId: number;
  offersId: number;
  beginAt: string;
  finishAt: string;

  constructor(
    id: number,
    productId: number,
    offersId: number,
    beginAt: string,
    finishAt: string
  ) {
    this.id = id;
    this.productId = productId;
    this.offersId = offersId;
    this.beginAt = beginAt;
    this.finishAt = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      productId: this.productId,
      offersId: this.offersId,
      beginAt: this.beginAt,
      finishAt: this.finishAt
    };
  }
}
