import { Espn } from "./espn";

class Player extends Espn {
  keys = [
    'id', 'name', 'headshot',
    'jersey', 'position', 'weight', 'height', 'age'
  ]

  customKeys = ['headshotImg', 'feet', 'inch'];

  constructor(data) {
    super(data);
    this.parse(data);
  }

  get headshotImg() {
    this.alt = this.name;
    return this.createImg(this.headshot);
  }

  get feet() {
    return Math.floor(this.height / 12);
  }

  get inch() {
    return Math.ceil(this.height % 12);
  }
}

export { Player };

