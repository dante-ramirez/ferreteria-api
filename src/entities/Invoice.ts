export default class Invoice {
  id: number;
  path: string;
  userId: number;
  salesId: number;
  constructor(
    id: number,
    path: string,
    userId: number,
    salesId: number
  ) {
    this.id = id;
    this.path = path;
    this.userId = userId;
    this.salesId = salesId;
  }
  serialize() {
    return {
      id: this.id,
      path: this.path,
      userId: this.userId,
      salesId: this.salesId
    };
  }
}
