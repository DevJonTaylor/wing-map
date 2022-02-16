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
    const img = this.newImg;
    if(this.isCustomizeImg) {
      this.customizeImg(img);

      return img.toHTML;
    }

    img.alt = this.name;
    img.src = this.headshot;

    return img.toHTML;
  }

  get feet() {
    return Math.floor(this.height / 12);
  }

  get inch() {
    return Math.ceil(this.height % 12);
  }
}

class PlayerGameStats extends Espn {
  keys = [
    'id', 'receptions', 'receivingTargets', 'receivingYards', 'yardsPerReception', 'receivingTouchdowns',
    'longReception', 'rushingAttempts', 'rushingYards', 'yardsPerRushAttempt', 'longRushing',
    'rushingTouchdowns', 'fumbles', 'fumblesLost', 'fumblesForced', 'kicksBlocked'
  ]

  constructor(data) {
    super(data);

    this.parse(data);
  }
}

export { Player, PlayerGameStats };

