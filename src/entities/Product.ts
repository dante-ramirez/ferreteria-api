export default class Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  code: string;
  discount: number;
  rewardPoints: number;
  model: string;
  pathImage1: string;
  pathImage2: string;
  pathImage3: string;
  pathImage4: string;
  departmentId: number;
  categoryId: number;
  brandId: number;
  offersId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    code: string,
    discount: number,
    rewardPoints: number,
    model: string,
    pathImage1: string,
    pathImage2: string,
    pathImage3: string,
    pathImage4: string,
    departmentId: number,
    categoryId: number,
    brandId: number,
    offersId: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.code = code;
    this.discount = discount;
    this.rewardPoints = rewardPoints;
    this.model = model;
    this.pathImage1 = pathImage1;
    this.pathImage2 = pathImage2;
    this.pathImage3 = pathImage3;
    this.pathImage4 = pathImage4;
    this.departmentId = departmentId;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.offersId = offersId;
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
      rewardPoints: this.rewardPoints,
      model: this.model,
      pathImage1: this.pathImage1,
      pathImage2: this.pathImage2,
      pathImage3: this.pathImage3,
      pathImage4: this.pathImage4,
      departmentId: this.departmentId,
      categoryId: this.categoryId,
      brandId: this.brandId,
      offersId: this.offersId
    };
  }
}
