import _Discount from './Discount';
import _IndividualDiscount from './IndividualDiscount';

export default class ProductDiscount {
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
  department: _Discount;
  category: _Discount;
  brand: _Discount;
  individualOffer: _IndividualDiscount;

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
    department: _Discount,
    category: _Discount,
    brand: _Discount,
    individualOffer: _IndividualDiscount
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
    this.department = department;
    this.category = category;
    this.brand = brand;
    this.individualOffer = individualOffer;
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
      department: this.department,
      category: this.category,
      brand: this.brand,
      individualOffer: this.individualOffer
    };
  }
}
