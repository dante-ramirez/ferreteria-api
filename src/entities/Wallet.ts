export default class Wallet {
  id: number;
  userId: number;
  points: number;
  unavailablePoints: number;

  constructor(
    id: number,
    userId: number,
    points: number,
    unavailablePoints: number
  ) {
    this.id = id;
    this.userId = userId;
    this.points = points;
    this.unavailablePoints = unavailablePoints;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      points: this.points,
      unavailablePoints: this.unavailablePoints
    };
  }
}
