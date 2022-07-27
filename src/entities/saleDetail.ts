/* eslint-disable camelcase */
export default class SaleDetail {
  id: number;
  amount: number;
  sale_price: number;
  sales_id: number;
  product_id: number;
  constructor(
    id: number,
    amount: number,
    sale_price: number,
    sales_id: number,
    product_id: number
  ) {
    this.id = id;
    this.amount = amount;
    this.sale_price = sale_price;
    this.sales_id = sales_id;
    this.product_id = product_id;
  }
  serialize() {
    return {
      id: this.id,
      amount: this.amount,
      sale_price: this.sale_price,
      sales_id: this.sales_id,
      product_id: this.product_id
    };
  }
}
