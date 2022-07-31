export default class Invoice {
  id: number;
  path: string;
  userId: number;
  constructor(
    id: number,
    path: string,
    userId: number
  ) {
    this.id = id;
    this.path = path;
    this.userId = userId;
  }
  serialize() {
    return {
      id: this.id,
      path: this.path,
      userId: this.userId
    };
  }
}
