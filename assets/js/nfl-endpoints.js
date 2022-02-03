// Provides a list of teams.
let rosters = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/$team/roster';
let gameList = 'https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/$athlete/gamelog';
let game = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/$game/competitions/$game/plays?limit=400';
/*
 * Created this to properly control the URL needed to make a call.
 * @property {boolean} isSecure Used to check if we use http or https.
 * @property {string[]} domainParts An array used to contain the sub, main, and top level domain parts.
 * @property {string[]} uriParts An array used to contain the path of the URL after the domain.
 * @property {object} parameters This literal object is used to create the query string.  
 */
 class UrlCreator {
  constructor() {
    this.isSecure = true;
    this.domainParts = [];
    this.uriParts = [];
    this.parameters = {};
  }

  /**
   * Is is setup so that when it is extended it can process a different URL.
   * @return {this} for chaining.
   */
  clear() {
    this.isSecure = true;
    this.domainParts = [];
    this.uriParts = [];
    this.parameters = {};

    return this;
  }

  /**
   * If no argument is passed then it will return the current protocol as a string.
   * If a boolean is passed it will assign it to the isSecure property and return itself.
   * @param {boolean|undefined} isSecure 
   * @returns {this|string} Returning itself for chaining.
   */
  protocol(isSecure) {
    if(isSecure === undefined) return this.isSecure === true ? 'https://' : 'http://';
    this.isSecure = isSecure;
    return this;
  }

  /**
   * If no argument is passed it will return the domain as a string.
   * Takes the arguments and pushes them to the domainParts.  Returns itself.
   * @param  {...string} args 
   * @returns {this|string}
   */
  domain(...args) {
    if(args === undefined) return this.domainParts.join('.');
    this.domainParts.push(...args);
    return this;
  }

  /**
   * If no argument is passed it will return the uri as a string.
   * Takes arguments passed and pushes them to uriParts.  Returns itself.
   * @param  {...string} args 
   * @returns {this|string}
   */
  uri(...args) {
    if(args === undefined) return this.uriParts.join('/');
    this.uriParts.push(...args);
    return this;
  }

  /**
   * Adds the key to the object if it is not present and assigns the value to it.
   * If the key already exists then it replaces the value.
   * @param {string} key 
   * @param {string} val 
   * @returns {this}
   */
  param(key, val) {
    this.parameters[key] = val;
    return this;
  }

  /**
   * Takes the current parameters and return them as a query string.
   * @return {string}
   */
  getParams() {
    let keys = Object.keys(this.parameters);
    let vals = Object.values(this.parameters);
    let params = [];

    for(let i in keys) {
      params.push(`${keys[i]}=${vals[i]}`);
    }

    return params.join('&');
  }

  /**
   * Returns the entire url as one.
   * @return {string}
   */
  get url() {
    let urlParts = [this.isSecure === true ? 'https://' : 'http://'];
    urlParts.push(this.domainParts.join('.'));
    if(this.uriParts.length > 0) urlParts.push('/' + this.uriParts.join('/'));
    if(Object.keys(this.parameters).length > 0) urlParts.push('?' + this.getParams())
    return urlParts.join('');
  }
}

/**
 * This was created so that you can extend and add a fetch process to a class.
 * @property {object} options 
 * @property {object} headers
 */
class FetchData extends UrlCreator {
  constructor() {
    super();
    this.options = {};
    this.headers = {};
  }

  /**
   * Allows you to reset options and headers if you should have to access more then one access point.
   * @returns {this} for chaining.
   */
  reset() {
    this.clear();
    this.options = {};
    this.headers = {};

    return this;
  }

  /**
   * If the value argument is not passed the value for the key that is set will be returned.
   * Sets the option to the key provided with the value passed.
   * Returns this for chaining.
   * @param {string} key 
   * @param {string|object|undefined} value 
   * @returns {this} for chaining
   */
  option(key, value) {
    if(value === undefined) return this.options[key];
    this.options[key] = value;

    return this;
  }

  /**
   * If the value argument is not passed it will return that header's value.
   * Assigns a value to the header key provided.
   * Returns this for chaining.
   * @param {string} key 
   * @param {string|undefined} value 
   * @returns {this}
   */
  header(key, value) {
    if(value === undefined) return this.headers[key];
    this.headers[key] = value
    return this;
  }

  /**
   * This will perform a fetch and returns a promise that is a literal object from the JSON provided.
   * @return {Promise<object>}
   */
  async getJSON() {
    let options = JSON.parse(JSON.stringify(this.options));
    options.headers = this.headers;
    let response = await fetch(this.url, options);

    return await response.json();
  }
}

class Team extends FetchData {
  constructor(id) {
    super();
    this.id = id;
    this.city = '';
    this.name = '';
    this.logo = '';
    this.win = 0;
    this.loss = 0;
    this.players = [];
  }

  async getRoster() {
    this.reset();
    const json = await this.domain('site', 'api', 'espn', 'com')
      .uri('apis', 'site', 'v2', 'sports', 'football', 'nfl', 'teams', this.id, 'roster')
      .getJSON();  
    const record = json.team.recordSummary.split('-');

    // Setting Team Data
    this.city = json.team.location;
    this.name = json.team.name;
    this.logo = json.team.logo;
    this.win = record[0];
    this.loss = record[1];

    for(let playerType of json.athletes) {
      for(let player of playerType.items) {
        player.team = {
          location: this.city,
          name: this.name
        };
        let playerObj = new Player();
        playerObj.forceJSON(player);
        this.players.push(playerObj);
      }
    }
  }
}

class Player extends FetchData {
  constructor(id) {
    super();
    this.id = id === undefined ? '' : id;
    this.name = '';
    this.height = 0
    this.weight = 0;
    this.position = {
      long: '',
      short: ''
    };
    this.jersey = 0;
    this.headshot = '';
    this.team = {
      location: '',
      name: ''
    }
    this.stats = [];
  }

  async getData(id) {
    if(id === undefined && this.id === '') throw new Error('there was not a Player ID Provided.');
    if(id === undefined) id = this.id;

    let json = await this.reset()
      .domain('site', 'web', 'api', 'espn', 'com')
      .uri('apis', 'common', 'v3', 'sports', 'football', 'nfl', 'athletes', id)
      .getJSON();

    return this.forceJSON(json);
  }

  async getStats() {
    
    let json = await this.reset()
      .domain('sports', 'core', 'api', 'espn', 'com')
      .uri('v2', 'sports', 'football', 'leagues', 'nfl', 'seasons', '2021', 'types', '2', 'athletes', 
      this.id, 'statistics', 0)
      .getJSON();

    for(let statCategory of json.splits.categories) {
      for(let stat of statCategory.stats) {
        this.stats[stat.name] = new Stat(stat);
      }
    }

    return this;
  }

  cardData() {
    let card = {
      name: this.name,
      team: `${this.team.location} ${this.team.name}`,
      jersey: this.jersey,
      headshot: this.headshot
    }

    for(let stat of this.stats) {
      card.stats[stat.name.long] = stat.value;
    }

    return card;
  }

  forceJSON(json) {
    this.id = json.id;
    this.name = json.fullName;
    this.height = json.height;
    this.weight = json.weight;
    this.position = {
      long: json.position.name,
      short: json.position.abbreviation
    };
    this.jersey = json.jersey;
    this.headshot = json.headshot.href;
    this.team = {
      location: json.team.location,
      name: json.team.name
    };

    return this;
  }
}

// https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/types/2/athletes/3115922/statistics/0
// https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/types/2/athletes/14876/statistics/0

class Stat {
  constructor(json) {
    this.name = {
      long: json.name,
      short: json.shortDisplayName,
      display: json.displayName,
      abbreviation: json.abbreviation
    }
    this.description = json.description;
    this.value = json.value;
    if(json.rank !== undefined) {
      this.rank = json.rank;
      this.displayRank = json.displayRankValue;
    }
  }
}

// TODO:  Create Game Object to run through plays.
// TODO:  Create Play Object