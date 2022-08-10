/* eslint-disable camelcase */
export default class Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  code: string;
  discount: number;
  reward_points: number;
  model: string;
  path_image1: string;
  path_image2: string;
  path_image3: string;
  path_image4: string;
  department_id: number;
  category_id: number;
  brand_id: number;
  offers_id: number;
  constructor(
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    code: string,
    discount: number,
    reward_points: number,
    model: string,
    path_image1: string,
    path_image2: string,
    path_image3: string,
    path_image4: string,
    department_id: number,
    category_id: number,
    brand_id: number,
    offers_id: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.code = code;
    this.discount = discount;
    this.reward_points = reward_points;
    this.model = model;
    this.path_image1 = path_image1;
    this.path_image2 = path_image2;
    this.path_image3 = path_image3;
    this.path_image4 = path_image4;
    this.department_id = department_id;
    this.category_id = category_id;
    this.brand_id = brand_id;
    this.offers_id = offers_id;
  }
  serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      code: this.code,
      discount: this.discount,
      reward_points: this.reward_points,
      model: this.model,
      path_image1: this.path_image1,
      path_image2: this.path_image2,
      path_image3: this.path_image3,
      path_image4: this.path_image4,
      department_id: this.department_id,
      category_id: this.category_id,
      brand_id: this.brand_id,
      offers_id: this.offers_id
    };
  }
}
