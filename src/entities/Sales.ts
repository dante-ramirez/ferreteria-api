import _Products from './Product';
import _SaleDetail from './SaleDetail';
import _User from './User';
import { statusType } from './Sale';

export default class Sales {
  id: number;
  userId: number;
  user: _User;
  code: string;
  date: string;
  subtotal: number;
  discountPoints: number;
  total: number;
  status: statusType;
  saleDetail: _SaleDetail[];
  products: _Products[];

  constructor(
    id: number,
    userId: number,
    user: _User,
    code: string,
    date: string,
    subtotal: number,
    discountPoints: number,
    total: number,
    status: statusType,
    saleDetail: _SaleDetail[],
    products: _Products[]
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.code = code;
    this.date = date;
    this.subtotal = subtotal;
    this.discountPoints = discountPoints;
    this.total = total;
    this.status = status;
    this.saleDetail = saleDetail;
    this.products = products;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      user: this.user.serialize(),
      code: this.code,
      date: this.date,
      subtotal: this.subtotal,
      discountPoints: this.discountPoints,
      total: this.total,
      status: this.status,
      saleDetail: this.saleDetail.map((detail) => detail.serialize()),
      products: this.products.map((product) => product.serialize())
    };
  }
}
