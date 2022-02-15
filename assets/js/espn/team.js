import { Espn } from "./espn";
import { TeamData } from "./static";
import { teamObject } from "./maps";

export class Team extends Espn {
  keys = [
    'id', 'location', 'name', 'abbreviation', 'color',
    'alternateColor', 'logo', 'wins', 'losses'
  ];

  customKeys = ['logoImg'];

  constructor(data) {
    super(data);

    if (data !== undefined) this.parse(data);
  }

  get losses() {
    return this.record.l;
  }

  get wins() {
    return this.record.w;
  }

  set losses(str) {}

  set wins(str) {}

  get location() {
    return this.loc;
  }

  get abbreviation() {
    return this.abbr;
  }

  get color() {
    return this.colors[0]
  }

  get alternateColor() {
    return this.colors[1];
  }

  set location(str) {}

  set abbreviation(str) {}

  set color(str) {}

  set alternateColor(str) {}

  get logo() {
    return TeamData.logos(this.logos)
  }

  set logo(str) {
    this.logos = str;
  }

  get logoImg() {
    const img = this.newImg;
    if(!this.isCustomizeImg) {
      img.alt = this.name;
      img.src = this.logo;

      return img.toHTML;
    }

    const customizedImg = this.customizeImg(img);

    return customizedImg.toHTML;
  }


}
