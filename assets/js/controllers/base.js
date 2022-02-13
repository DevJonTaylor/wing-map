import { EventEmitter } from 'events';
import { random } from "lodash";

class BaseController extends EventEmitter {
  data = {};

  constructor() {
    super();
  }

  get isDev() {
    return (EspnOptions.mode === 'development');
  }

  get isData() {
    return this.data instanceof Map || this.data instanceof BaseController;
  }

  get isHistory() {
    return this.has('history');
  }

  get db() {
    if(this.isData) return this.data;

    this.data = new Map();
    return this.data;
  }

  get history() {
    return !this.isHistory ? this.newHistory() : this.get('history')
    // TODO:  Read actions and items and their types added to the database.
  }

  set history(history) {
    this.set('history', history);
  }

  hexId(length = 12) {
    const charList = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let id = '';

    for(let i = 0;i < length;i++) {
      let randomNumber = random(0, (charList.length - 1));
      id += charList[randomNumber];
    }

    return id;
  }

  newHistory() {
    const history = {};
      if(!this.has('history')) this.set('history', history);

    return history;
  }

  historyEntry({ name, value, action }) {
    const id = this.hexId();
    const history = this.history;
    const entry = { [id]: { id, name, value, action, time: new Date() }};
    Object.assign(history, entry);

    return this;
  }

  get(key, defaultValue = undefined) {
    return this.has(key) ? this.db.get(key) : defaultValue;
  }

  set(key, val) {
    this.db.set(key, val);

    return this
  }

  has(key) {
    return this.db.has(key);
  }

  error(err) {
    this.log('ERROR DETECTED')
      .log(`Type:  ${err.name}`)
      .log(`Message:  ${err.message}`);

    return this;
  }

  log(msg) {
    console.log(msg);
    return this;
  }

  get toObject() {
    return { [this.constructor.name]: Object.fromEntries(this.db) };
  }

  toString() {
    return JSON.stringify(this.toObject);
  }

  isBaseController(obj) {
    return obj instanceof BaseController;
  }
}

export { BaseController }
