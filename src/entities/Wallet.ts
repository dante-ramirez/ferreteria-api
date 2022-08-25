export default class Wallet {
  id: number;
  userId: number;
  amount: number;

  constructor(
    id: number,
    userId: number,
    amount: number
  ) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      amount: this.amount
    };
  }
}
