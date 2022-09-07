export default class Category {
  id: number;
  name: string;
  offersId: number;
  beginAt: string;
  finishAt: string;

  constructor(
    id: number,
    name: string,
    offersId: number,
    beginAt: string,
    finishAt: string
  ) {
    this.id = id;
    this.name = name;
    this.offersId = offersId;
    this.beginAt = beginAt;
    this.finishAt = finishAt;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      offersId: this.offersId,
      beginAt: this.beginAt,
      finishAt: this.finishAt
    };
  }
}
