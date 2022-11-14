export default class Product {
  id: number;
  name: string;
  details: string;
  stock: number;
  code: string;
  price: number;
  finalPrice: number;
  rewardPoints: number;
  model: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  departmentId: number;
  categoryId: number;
  brandId: number;
  individualOfferId: number;

  constructor(
    id: number,
    name: string,
    details: string,
    stock: number,
    code: string,
    price: number,
    finalPrice: number,
    rewardPoints: number,
    model: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    departmentId: number,
    categoryId: number,
    brandId: number,
    individualOfferId: number
  ) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.stock = stock;
    this.code = code;
    this.price = price;
    this.finalPrice = finalPrice;
    this.rewardPoints = rewardPoints;
    this.model = model;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
    this.departmentId = departmentId;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.individualOfferId = individualOfferId;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      details: this.details,
      stock: this.stock,
      code: this.code,
      price: this.price,
      finalPrice: this.finalPrice,
      rewardPoints: this.rewardPoints,
      model: this.model,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4,
      departmentId: this.departmentId,
      categoryId: this.categoryId,
      brandId: this.brandId,
      individualOfferId: this.individualOfferId
    };
  }
}
