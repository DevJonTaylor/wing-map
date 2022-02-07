/*
 * Created this to properly control the URL needed to make a call.3115922
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
    this.resp = {};
    this.options = {};
    this.headers = {};
  }

  /**
   * An easier way to track what request is made and what steps were taken.
   * @param {string} title
   * @param {string|number|array|object} msg
   * @returns {this} For chaining
   */
  response(title, msg) {
    this.resp[title] = msg;

    return this;
  }

  /**
   * Allows you to reset options and headers if you should have to access more then one access point.
   * @returns {this} for chaining.
   */
  reset() {
    this.clear();
    this.options = {};
    this.headers = {};
    this.resp = {};

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

class EspnApis extends FetchData {

  siteApi() {
    return this.reset()
      .response('time', new Date().getTime())
      .response('call', 'siteApi')
      .domain('site', 'api', 'espn', 'com')
      .uri('apis', 'site', 'v2', 'sports', 'football', 'nfl');
  }

  webApi() {
    return this.reset()
      .response('time', new Date().getTime())
      .response('call', 'webApi')
      .domain('site', 'web', 'api', 'espn', 'com')
      .uri('apis', 'common', 'v3', 'sports', 'football', 'nfl');
  }

  coreApi() {
    return this.reset()
      .response('time', new Date().getTime())
      .response('call', 'coreApi')
      .domain('sports', 'core', 'api', 'espn', 'com')
      .uri('v2', 'sports', 'football', 'leagues', 'nfl');
  }

  isObject(variable) {
    return _.isObject(variable);
  }

  async toJson(noCall) {
    this.response.url = this.url;

     if(noCall !== undefined) {
       this.response('url', this.url)
         .response('ESPN', noCall);
     } else {
       let json = await this.getJSON();
       this.response('ESPN', json)
         .response('url', this.url);
     }

     return new EspnHelper(this.resp);
  }
}

class GameApis extends EspnApis {
  scoreboard(season, noCall) {
    return this.siteApi()
      .uri('scoreboard')
      .param('limit', 400)
      .param('dates', SeasonsHelper.getYMD(season))
      .toJson(noCall);
  }

  plays(gameId, noCall) {
    return this.coreApi()
      .uri('events', gameId, 'competitions', gameId, 'plays')
      .param('limit', 400)
      .toJson(noCall)
  }
}

class EspnApiFactory {
  static runErrorCheck(argObj, method) {
    let args = [];
    let badArgs = [];
    let badValues = [];
    _.each(argObj, (v, k) => {
      if(!v) {
        badArgs.push(k);
        badValues.push('empty');
        args.push(0);
      } else {
        args.push(v);
      }
    })

    if(badArgs.length > 0) return method()(...this.badArg(badArgs.join(' '), badValues.join(' '), args));
    return method()(...args);
  }

  static badArg(name, value, args) {
    args = [...args];
    args.push(`Error: ${name} - ${value}`)
    return args;
  }

  static team = {
    Api() {
      return new TeamApis();
    },
    id(id) {
      let args = EspnApiFactory.badArg('teamId', 'Empty', 0);
      return !id ?
        this.Api().teams(...args) :
        this.Api().teams(id);
    },
    roster(teamId, roster1 = true) {
      const api = this.Api();
      if(!teamId) {
        let args = EspnApiFactory.badArg('teamId', 'Empty', 0)
        return roster1 === true ?
          api.roster1(...args) :
          api.roster2(...args);
      }
      return roster1 === true ?
        api.roster1(teamId) :
        api.roster2(teamId);
    },
    schedule(teamId) {
      let args = EspnApiFactory.badArg('teamId', 'Empty', 0);

      return !teamId ?
        this.Api().schedule(...args) :
        this.Api().schedule(teamId);
    }
  };

  static player = {
    Api(path) {
      return () => {
        let api = new PlayerApis();
        return _.get(api, path).bind(api);
      }
    },
    gamelog(playerId) {
      let args = { playerId };

      return EspnApiFactory.runErrorCheck(args, this.Api('gamelog'));
    },
    eventlog(playerId, season) {
      let args = { playerId, season };

      return EspnApiFactory.runErrorCheck(args, this.Api('eventlog'));
    },
    main(playerId) {
      let args = { playerId };

      return EspnApiFactory.runErrorCheck(args, this.Api('main'));
    },
    stats(playerId) {
      let args = { playerId };

      return EspnApiFactory.runErrorCheck(args, this.Api('stats'));
    },
    overview(playerId) {
      let args = { playerId };

      return EspnApiFactory.runErrorCheck(args, this.Api('overview'));
    },
    projection(playerId, season) {
      let args = { playerId, season };

      return EspnApiFactory.runErrorCheck(args, this.Api('projection'));
    },
    statistics(playerId, season) {
      let args = { playerId, season };

      return EspnApiFactory.runErrorCheck(args, this.Api('statistics'));
    }
  }
}

// TODO:  Player gets eventLog
// TODO:  Game gets the plays.
// TODO:  Parse the plays into stats for the players.