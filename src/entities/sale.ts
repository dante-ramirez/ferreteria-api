/* eslint-disable camelcase */
export default class Sale {
  id: number;
  code: string;
  date: string;
  total: number;
  subtotal: number;
  user_id: number;

  constructor(
    id: number,
    code: string,
    date: string,
    total: number,
    subtotal: number,
    user_id: number
  ) {
    this.id = id;
    this.code = code;
    this.date = date;
    this.total = total;
    this.subtotal = subtotal;
    this.user_id = user_id;
  }

  serialize() {
    return {
      id: this.id,
      code: this.code,
      date: this.date,
      total: this.total,
      subtotal: this.subtotal,
      user_id: this.user_id
    };
  }
}
