export default class Sale {
  id: number;
  code: string;
  date: string;
  total: number;
  subtotal: number;
  userId: number;

  constructor(
    id: number,
    code: string,
    date: string,
    total: number,
    subtotal: number,
    userId: number
  ) {
    this.id = id;
    this.code = code;
    this.date = date;
    this.total = total;
    this.subtotal = subtotal;
    this.userId = userId;
  }

  serialize() {
    return {
      id: this.id,
      code: this.code,
      date: this.date,
      total: this.total,
      subtotal: this.subtotal,
      userId: this.userId
    };
  }
}
