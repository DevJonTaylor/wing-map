class Team extends Espn {
  keys = [
      'id', 'location', 'name', 'abbreviation', 'color',
      'alternateColor', 'logo', 'wins', 'losses'
    ];

  customKeys = ['logoImg'];

  constructor(data) {
    super(data);
    this.keys = EspnStaticTeamData.keys;
    if(data !== undefined) this.parse(data);
  }

  get losses() {
    return this.record.l;
  }

  get wins() {
    return this.record.w;
  }

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

  get logo() {
    return EspnStaticTeamData.logos.replace('$$logo$$', this.logos);
  }

  set logo(str) {
    this.logos = str;
  }

  get logoImg() {
    return this.createImg(this.logo);
  }
}