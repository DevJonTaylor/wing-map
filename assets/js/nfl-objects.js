/**
 * @property {string} id ESPN assigned ID for Teams.
 * @property {string} location City name in string format.
 * @property {string} name Name of the team.
 * @property {string} color Color in hex format.
 * @property {string} alternateColor Color in hex format.
 */
class Team {
  constructor(jsonTeamObject) {
    this.id = jsonTeamObject.id;
    this.location = jsonTeamObject.location;
    this.name = jsonTeamObject.name;
    this.color = jsonTeamObject.color;
    this.alternateColor = jsonTeamObject.alternateColor;
    this.logo = new Image(jsonTeamObject.logos[0]);
    this.wins = jsonTeamObject.record.items[0].stats[1].value;
    this.losses = jsonTeamObject.record.items[0].stats[2].value;
    this.players = [];

    for(let player of jsonTeamObject.athletes) {
      this.players.push(new Player(player));
    }
  }
}

/**
 * This class was created for images received via ESPN data.
 */
class Image {
  constructor(jsonImageObject) {
    this.img = document.createElement('img');
    for(let key in jsonImageObject) {
      if(key === 'lastUpdated') break;
      if(key === 'rel') this.rel(jsonImageObject[key][0])
      let val = jsonImageObject[key];
    }
  }

  attr(attr, val) {
    if(val === undefined) return this.img.getAttribute(attr);
    this.img.setAttribute(attr, val);

    return this;
  }

  alt(alt) {
    return this.attr('alt', alt);
  }

  width(width) {
    return this.attr('width', width);
  }

  height(height) {
    return this.attr('height', height);
  }

  href(href) {
    return this.attr('href', href);
  }

  rel(rel) {
    return this.attr('rel', rel);
  }

  addClass(...cls) {
    this.img.classList.add(...cls);
  }

  removeClass(...cls) {
    this.img.classList.remove(...cls);
  }

  get toObject() {
    let obj = {};
    for(let attribute of this.img.attributes) {
      obj[attribute.name] = attribute.value;
    }

    return obj;
  }

  get toHTML() {
    return this.img;
  }

  get toString() {
    return JSON.stringify(this.toObject);
  }
}


class Player {
  constructor(jsonPlayerObject) {
    this.id = jsonPlayerObject.id;
    this.firstName = jsonPlayerObject.firstName;
    this.lastName = jsonPlayerObject.lastName;
    this.fullName = jsonPlayerObject.fullName;
    this.headshot = new Image(jsonPlayerObject.headshot);
    this.jersey = jsonPlayerObject.jersey;
    this.position = jsonPlayerObject.position.name
  }

  get toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      headshot: this.headshot,
      jersey: this.jersey,
      position: this.position
    }
  }

  toString() {
    return JSON.stringify(this.toObject);
  }
}