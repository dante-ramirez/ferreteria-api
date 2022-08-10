export default class SaleDetail {
  id: number;
  amount: number;
  sale_price: number;
  sales_id: number;
  product_id: number;
  constructor(
    id: number,
    amount: number,
    salePrice: number,
    salesId: number,
    productId: number
  ) {
    this.id = id;
    this.amount = amount;
    this.sale_price = salePrice;
    this.sales_id = salesId;
    this.product_id = productId;
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
