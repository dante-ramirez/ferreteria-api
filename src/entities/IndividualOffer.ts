export default class IndividualOffer {
  id: number;
  offersId: number;
  beginAt: string;
  finishAt: string;

  constructor(
    id: number,
    offersId: number,
    beginAt: string,
    finishAt: string
  ) {
    this.id = id;
    this.offersId = offersId;
    this.beginAt = beginAt;
    this.finishAt = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      offersId: this.offersId,
      beginAt: this.beginAt,
      finishAt: this.finishAt
    };
  }
}
