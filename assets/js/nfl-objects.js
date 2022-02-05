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

const positions = [
  { id: "0", name: "Unknown", abbr: "-" },
  { id: "1", name: "Wide Receiver", abbr: "WR" },
  { id: "2", name: "Left Tackle  ", abbr: "LT" },
  { id: "3", name: "Left Guard  ", abbr: "LG" },
  { id: "4", name: "Center", abbr: "C" },
  { id: "5", name: "Right Guard", abbr: "RG" },
  { id: "6", name: "Right Tackle", abbr: "RT" },
  { id: "7", name: "Tight End", abbr: "TE" },
  { id: "8", name: "Quarterback", abbr: "QB" },
  { id: "9", name: "Running Back", abbr: "RB" },
  { id: "10", name: "Fullback", abbr: "FB" },
  { id: "11", name: "Left Defensive End", abbr: "LDE" },
  { id: "12", name: "Nose Tackle", abbr: "NT" },
  { id: "13", name: "Right Defensive End", abbr: "RDE" },
  { id: "14", name: "Left Outside Linebacker  ", abbr: "LOLB" },
  { id: "15", name: "Left Inside Linebacker  ", abbr: "LILB" },
  { id: "16", name: "Right Inside Linebacker", abbr: "RILB" },
  { id: "17", name: "Right Outside Linebacker", abbr: "ROLB" },
  { id: "18", name: "Left Cornerback", abbr: "LCB" },
  { id: "19", name: "Right Cornerback", abbr: "RCB" },
  { id: "20", name: "Strong Safety", abbr: "SS" },
  { id: "21", name: "Free Safety", abbr: "FS" },
  { id: "22", name: "Place kicker", abbr: "PK" },
  { id: "23", name: "Punter", abbr: "P" },
  { id: "24", name: "Left Defensive Tackle  ", abbr: "LDT" },
  { id: "25", name: "Right Defensive Tackle", abbr: "RDT" },
  { id: "26", name: "Weakside Linebacker  ", abbr: "WLB" },
  { id: "27", name: "Middle Linebacker", abbr: "MLB" },
  { id: "28", name: "Strongside Linebacker  ", abbr: "SLB" },
  { id: "29", name: "Cornerback", abbr: "CB" },
  { id: "30", name: "Linebacker", abbr: "LB" },
  { id: "31", name: "Defensive End", abbr: "DE" },
  { id: "32", name: "Defensive Tackle", abbr: "DT" },
  { id: "33", name: "Under Tackle", abbr: "UT" },
  { id: "34", name: "Nickel Back", abbr: "NB" },
  { id: "35", name: "Defensive Back", abbr: "DB" },
  { id: "36", name: "Safety", abbr: "S" },
  { id: "37", name: "Defensive Lineman", abbr: "DL" },
  { id: "39", name: "Long Snapper", abbr: "LS" },
  { id: "45", name: "Offensive Lineman", abbr: "OL" },
  { id: "46", name: "Offensive Tackle", abbr: "OT" },
  { id: "47", name: "Offensive Guard", abbr: "OG" },
  { id: "50", name: "Athlete", abbr: "ATH" },
  { id: "70", name: "Offense", abbr: "OFF" },
  { id: "71", name: "Defense", abbr: "DEF" },
  { id: "72", name: "Special Teams", abbr: "ST" },
  { id: "73", name: "Guard", abbr: "G" },
  { id: "74", name: "Tackle", abbr: "T" },
  { id: "75", name: "Nose Guard", abbr: "NG" },
  { id: "76", name: "Punt Returner", abbr: "PR" },
  { id: "77", name: "Kick Returner", abbr: "KR" },
  { id: "78", name: "Long Snapper", abbr: "LS" },
  { id: "79", name: "Holder", abbr: "H" },
  { id: "90", name: "Inside Linebacker", abbr: "ILB" },
  { id: "99", name: "Unknown", abbr: "-" },
  { id: "100", name: "Flanker", abbr: "FL" },
  { id: "101", name: "Halfback", abbr: "HB" },
  { id: "102", name: "Tailback", abbr: "TB" },
  { id: "103", name: "Left Halfback", abbr: "LHB" },
  { id: "104", name: "Right Halfback", abbr: "RHB" },
  { id: "105", name: "Left Linebacker", abbr: "LLB" },
  { id: "106", name: "Right Linebacker", abbr: "RLB" },
  { id: "107", name: "Outside Linebacker", abbr: "OLB" },
  { id: "108", name: "Left Safety", abbr: "LSF" },
  { id: "109", name: "Right Safety", abbr: "RSF" },
  { id: "110", name: "Middle Guard", abbr: "MG" },
  { id: "111", name: "Split End", abbr: "SE" },
  { id: "218", name: "Setter", abbr: "SETTER" },
  { id: "219", name: "Back", abbr: "B" }
]

class SeasonsHelper {
  static seasons = {
    2021: {startDate: '2021-09-09', endDate: '2022-01-09'},
    2020: {startDate: '2020-08-05', endDate: '2021-02-10'},
    2019: {startDate: '2019-07-31', endDate: '2020-02-06'},
    2018: {startDate: '2018-08-02', endDate: '2019-02-06'},
    2017: {startDate: '2017-08-02', endDate: '2018-02-07'},
    2016: {startDate: '2016-08-03', endDate: '2017-02-09'},
    2015: {startDate: '2015-08-05', endDate: '2016-02-10'},
    2014: {startDate: '2014-07-30', endDate: '2015-02-04'},
    2013: {startDate: '2013-08-01', endDate: '2014-02-05'},
    2012: {startDate: '2012-08-01', endDate: '2013-02-13'},
    2011: {startDate: '2011-08-03', endDate: '2012-02-15'},
    2010: {startDate: '2010-08-04', endDate: '2011-02-09'},
    2009: {startDate: '2009-08-04', endDate: '2010-02-10'},
    2008: {startDate: '2008-07-30', endDate: '2009-02-11'},
    2007: {startDate: '2007-08-01', endDate: '2008-02-13'},
    2006: {startDate: '2006-08-03', endDate: '2007-02-16'},
    2005: {startDate: '2005-08-03', endDate: '2006-02-16'},
    2004: {startDate: '2004-08-04', endDate: '2005-02-16'},
    2003: {startDate: '2003-07-30', endDate: '2004-02-04'},
    2002: {startDate: '2002-07-16', endDate: '2003-07-29'},
    2001: {startDate: '2001-08-03', endDate: '2002-03-03'},
    2000: {startDate: '2000-07-29', endDate: '2001-03-03'},
    1999: {startDate: '1999-07-12', endDate: '2000-02-01'},
    1998: {startDate: '1998-09-06', endDate: '1999-02-02'},
    1997: {startDate: '1997-08-31', endDate: '1998-01-27'},
    1996: {startDate: '1996-09-01', endDate: '1997-01-28'},
  }

  static getYMD(year) {
    const startDate = SeasonsHelper.seasons[year].startDate.replace(/-/g, '');
    const endDate = SeasonsHelper.seasons[year].endDate.replace(/-/g, '');

    return `${startDate}-${endDate}`;
  }
}