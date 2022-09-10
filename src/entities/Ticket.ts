import _SaleDetail from './SaleDetail';
import { statusType } from './Sale';

export default class Ticket {
  id: number;
  userId: number;
  code: string;
  date: string;
  subtotal: number;
  discountPoints: number;
  total: number;
  status: statusType;
  request: boolean;
  saleDetail: _SaleDetail[];

  constructor(
    id: number,
    userId: number,
    code: string,
    date: string,
    subtotal: number,
    discountPoints: number,
    total: number,
    status: statusType,
    request: boolean,
    saleDetail: _SaleDetail[]
  ) {
    this.id = id;
    this.userId = userId;
    this.code = code;
    this.date = date;
    this.subtotal = subtotal;
    this.discountPoints = discountPoints;
    this.total = total;
    this.status = status;
    this.request = request;
    this.saleDetail = saleDetail;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      code: this.code,
      date: this.date,
      subtotal: this.subtotal,
      discountPoints: this.discountPoints,
      total: this.total,
      status: this.status,
      request: this.request,
      saleDetail: this.saleDetail.map((detail) => detail.serialize())
    };
  }
}
