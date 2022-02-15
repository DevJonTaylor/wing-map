import { BaseController } from './';

class Storage extends BaseController {
  data

  constructor() {
    super();
  }

  remove(key) {
    this.dataObject.remove(key);

    return this;
  }

  keys() {
    return this.dataObject.keys();
  }

  values() {
    return this.dataObject.values();
  }

  forEach(callback) {
    for(const [key, value] of this.dataObject.entries()) {
      callback(value, key);
    }

    return this;
  }

  onLoadLocal(...args) {
    this.on('loadLocal', ...args);
  }

  onSaveLocal(...args) {
    this.on('saveLocal', ...args);
  }

  toString() {
    return JSON.stringify(this.toObject);
  }

  async loadLocal() {
    let serializedData = localStorage.getItem(window.EspnOptions.localStorageKey);
    if(!serializedData) return null;

    const data = JSON.parse(serializedData);

    for(const [key, value] of data.entries()) {
      this.set(key, value);
    }

    return this;
  }

  async saveLocal() {
    let serializedData = this.toString();

    localStorage.setItem(window.EspnOptions.localStorageKey, serializedData);

    return this;
  }
}

export { Storage }
