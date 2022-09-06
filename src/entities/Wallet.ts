export default class Wallet {
  id: number;
  userId: number;
  points: number;

  constructor(
    id: number,
    userId: number,
    points: number
  ) {
    this.id = id;
    this.userId = userId;
    this.points = points;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      points: this.points
    };
  }
}
