/* eslint-disable camelcase */
export default class Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  code: string;
  price: number;
  finalPrice: number;
  rewardPoints: number;
  model: string;
  pathImage1: string;
  pathImage2: string;
  pathImage3: string;
  pathImage4: string;
  departmentId: number;
  categoryId: number;
  brandId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    stock: number,
    code: string,
    price: number,
    finalPrice: number,
    rewardPoints: number,
    model: string,
    pathImage1: string,
    pathImage2: string,
    pathImage3: string,
    pathImage4: string,
    departmentId: number,
    categoryId: number,
    brandId: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.code = code;
    this.price = price;
    this.finalPrice = finalPrice;
    this.rewardPoints = rewardPoints;
    this.model = model;
    this.pathImage1 = pathImage1;
    this.pathImage2 = pathImage2;
    this.pathImage3 = pathImage3;
    this.pathImage4 = pathImage4;
    this.departmentId = departmentId;
    this.categoryId = categoryId;
    this.brandId = brandId;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      stock: this.stock,
      code: this.code,
      price: this.price,
      finalPrice: this.finalPrice,
      rewardPoints: this.rewardPoints,
      model: this.model,
      pathImage1: this.pathImage1,
      pathImage2: this.pathImage2,
      pathImage3: this.pathImage3,
      pathImage4: this.pathImage4,
      departmentId: this.departmentId,
      categoryId: this.categoryId,
      brandId: this.brandId
    };
  }
}
