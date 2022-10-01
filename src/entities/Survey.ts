export default class Survey {
  id: number;
  link: string;

  constructor(
    id: number,
    link: string
  ) {
    this.id = id;
    this.link = link;
  }

  serialize() {
    return {
      id: this.id,
      link: this.link
    };
  }
}
