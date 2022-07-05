// import _UserPack from './UserPack';

export type userRole = 'administrator' | 'client';

export default class Department {
  id: number;
  name: string;
  discount: number;

  constructor(
    id: number,
    name: string,
    discount: number
  ) {
    this.id = id;
    this.name = name;
    this.discount = discount;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      discount: this.discount
    };
  }
}
