export default class SaleDetail {
  id: number;
  salesId: number;
  productId: number;
  salePrice: number;
  quantity: number;
  amount: number;

  constructor(
    id: number,
    salesId: number,
    productId: number,
    salePrice: number,
    quantity: number,
    amount: number
  ) {
    this.id = id;
    this.salesId = salesId;
    this.productId = productId;
    this.salePrice = salePrice;
    this.quantity = quantity;
    this.amount = amount;
  }

  serialize() {
    return {
      id: this.id,
      salesId: this.salesId,
      productId: this.productId,
      salePrice: this.salePrice,
      quantity: this.quantity,
      amount: this.amount
    };
  }
}
