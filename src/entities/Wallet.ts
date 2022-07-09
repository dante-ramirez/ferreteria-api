export default class Wallet {
  id: number;
  amount: number;
  userId: number;

  constructor(
    id: number,
    amount: number,
    userId: number
  ) {
    this.id = id;
    this.amount = amount;
    this.userId = userId;
  }

  serialize() {
    return {
      id: this.id,
      amount: this.amount,
      userId: this.userId
    };
  }
}
