/**
 * This class was created to manage connections to data that is being stored.
 * @property {object|array} data This is where the data is stored.
 */
class DataHandler {
  /**
   * @param {object|array} data Any data Object || Array can be managed.
   */
  constructor(data = {}) {
    this.data = _.clone(data);
  }

  /**
   * A forEach method that utilizes _.forEach method.
   * I pass all the arguments into the callback provided.
   * @param {function} callback
   */
  forEach(callback) {
    _.forEach(this.data, function() {
      callback(...arguments);
    })
  }

  /**
   * Utilizing _.get to retrieve any stored data.
   * @param {string|array} path
   * @param {any} defaultValue
   * @returns {any}
   */
  get(path, defaultValue) {
    return _.get(this.data, path, defaultValue);
  }

  /**
   * Using _.set method to set data regardless of the path.
   * @param {string|array} path This is where the data will be stored inside the data that is being managed.
   * @param {object|number|string} value
   * @example
   * 'headshot.href' || ['headshot', 'href'] = { headshot: { href: 'https://www.google.com' } }
   */
  set(path, value) {
    _.set(this.data, path, value);
  }

  /**
   * This method performs a check utilizing both _.isNumber as well as _.toNumber to ensure the data
   * is both a number and being returned a number.
   * @param {string|array} path
   * @param {number} defaultValue By default this is set to zero.  You can change this by passing a second argument.
   * @return {number}
   */
  getNumber(path, defaultValue = 0) {
    // TODO:  Figure out why all the numbers but weight is coming back as zero.

    let val = _.toNumber(this.get(...arguments));
    return (_.isNumber(val) !== true) ? defaultValue : val;
  }

  /**
   * This method performs two checks to ensure it is a string before returning the values retrieved.
   * If it fails the first one it will return the defaultValue assigned in the second argument slot.
   * If it is determined after the first check then whatever has gone past it will be returned.
   * @param {string|array} path
   * @param {any} defaultValue
   * @returns {string|string}
   */
  getString(path, defaultValue = '') {
    let val = this.get(...arguments);

    return (_.isString(val) !== true) ? defaultValue : _.toString(val);
  }

  /**
   * Utilizing _.clone method to quickly clone the data without having to correct up.
   * @returns {object}
   */
  get toObject() {
    return _.clone(this.data);
  }

  /**
   * Serialize in string format.
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.toObject);
  }

  /**
   * Takes two variables and attempts to merge them together.
   * Utilizing _.merge does the job really well.  It is important to note that _.merge mutates Objects.
   * To Ensure that this did not negatively affect this project I am cloning the two arguments passed.
   * @param {array} keys
   * @param {array} values
   * @returns {object}
   */
  static mergeKeysAndValues(keys, values) {
    const obj = new Object(keys, values);

    for(let i in keys) {
      obj[keys[i]] = values[i];
    }

    return obj;
  }
}

class EspnResponseHandler extends DataHandler {}

class DatabaseAndSearch {
  static database = []

  static getDB() {
    return _.chain(this.database);
  }

  static searchDatabase(key, val) {
    return this.getDB()
      .find({[key]: val})
      .value();
  }
}

class EspnDataController {
  constructor() {
    this.isActive = false;
    this.current = {};
    this.dirty = []
    this.events = {
      before: [],
      after: []
    };

    this.onCleanFinish(this.scrubData)
  }

  onCleanStart(eventListener) {
    this.events.before.push(eventListener);
  }

  cleanData(data) {
    this.dirty.push(data);
    if(this.isActive === true) return this;

    this.scrubData();
    return this;
  }

  onCleanFinish(eventListener) {
    this.events.after.push(eventListener);
  }

  emit(eventName, ...args) {
    _.each(this.events[eventName], eventListener => {
      eventListener(!this.isActive, ...args);
    })
  }

  scrubData() {
    /** This is to ensure that the loop stops so do I. */
    if(this.dirty.length <= 0) return;
    this.isActive = true; // Working now.
    let data = this.dirty.shift(); // Getting the next data to be scrubbed.
    let scrubbed = {};
    this.current = data;
    this.emit('before', data);

    if(_.has(data, 'team') === true) {
      // Team Roster 1
      scrubbed = this.scrubTeamRoster1();
      this.scrubPlayersRoster1();
    } else {
      // Team Roster 2
      this.scrubTeamRoster2();
      this.scrubPlayersRoster2();
    }
    this.isActive = false;
    this.current = {};
    this.emit('after', scrubbed)
  }

  scrubPlayersRoster1() {

  }

  scrubPlayersRoster2() {}

  scrubTeamRoster1() {
    let isReady = false;
    let rawData = this.current;
    let teamData = TeamHelper.id();
  }
  scrubTeamRoster2() {

  }
}

