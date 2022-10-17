export default class Invoice {
  id: number;
  filename: string;
  userId: number;
  salesId: number;

  constructor(
    id: number,
    filename: string,
    userId: number,
    salesId: number
  ) {
    this.id = id;
    this.filename = filename;
    this.userId = userId;
    this.salesId = salesId;
  }

  serialize() {
    return {
      id: this.id,
      filename: this.filename,
      userId: this.userId,
      salesId: this.salesId
    };
  }
}
