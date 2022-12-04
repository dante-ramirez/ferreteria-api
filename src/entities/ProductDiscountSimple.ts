import Product from './Product';

export default class Saving {
  product: Product;
  saving: number;
  percent: number;

  constructor(
    product: Product,
    saving: number,
    percent: number
  ) {
    this.product = product;
    this.saving = saving;
    this.percent = percent;
  }

  serialize() {
    return {
      product: this.product.serialize(),
      saving: this.saving,
      percent: this.percent
    };
  }
}
