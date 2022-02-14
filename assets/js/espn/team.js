import { Espn } from "./espn";
import { teamObject } from "./maps";

export class Team extends Espn {
  keys = [
    'id', 'location', 'name', 'abbreviation', 'color',
    'alternateColor', 'logo', 'wins', 'losses'
  ];

  customKeys = ['logoImg'];

  constructor(data) {
    super(data);
<<<<<<< .merge_file_a28948
    const newKeys = teamObject(true);
    this.keys = new Array(...new Set(newKeys.concat(this.keys)));

    if(data !== undefined) this.parse(data);
=======

    this.keys = [...new Set(this.keys.concat(EspnStaticTeamData.keys))];
    if (data !== undefined) this.parse(data);
>>>>>>> .merge_file_a27168
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
    return EspnStaticTeamData.logos.replace('$$logo$$', this.logos);
  }

  set logo(str) {
    this.logos = str;
  }

  get logoImg() {
    return this.createImg(this.logo);
  }
<<<<<<< .merge_file_a28948
}
=======


}
>>>>>>> .merge_file_a27168
