/**
 * Created this to properly control the URL needed to make a call.
 * @property {boolean} isSecure Used to check if we use http or https.
 * @property {string[]} domainParts An array used to contain the sub, main, and top level domain parts.
 * @property {string[]} uriParts An array used to contain the path of the URL after the domain.
 * @property {object} parameters This literal object is used to create the query string.
 */
class UrlCreator {
  isSecure = true;
  domainParts = [];
  uriParts = [];
  parameters = {};

  /**
   * Is set up so that when it is extended it can process a different URL.
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
  retryAttempts = 5;
  waitToRetry = 3000;
  constructor() {
    super();
    this.resp = {};
    this.options = {};
    this.headers = {};
  }

  /**
   * An easier way to track what request is made and what steps were taken.
   * @param {string} title
   * @param {any} msg
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

  cloneOptions() {
    const headers = { headers: Object.assign({}, this.headers) };
    return Object.assign({}, this.options, headers);
  }

  waitAndTryAgain(attempts) {
    if(attempts >= this.retryAttempts) return Promise.reject('Failed to connect and tried to many times.');

    setTimeout(() => {
      return this.getJSON(attempts);
    }, this.waitToRetry);
  }

  statusCodeCanRetry(statusCode) {
    switch(statusCode) {
      case 504:
        return true;
      default:
        return false;
    }
  }

  /**
   * This will perform a fetch and returns a promise that is a literal object from the JSON provided.
   * @return {Promise<object>}
   */
  async getJSON(attempts = 0) {
    let response = await fetch(this.url, this.cloneOptions());
    if(!response.ok) {
      if(this.statusCodeCanRetry(response.statusCode) && attempts > this.retryAttempts) {
        setTimeout(this.getJSON, this.waitToRetry)
      }
    }


    return response.json();
  }
}

export { FetchData, UrlCreator }


