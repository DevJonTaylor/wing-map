import { random, get, merge } from 'lodash';
import { CustomImage } from "../views/image";
import { nanoid } from "nanoid";

class Espn {
  keys = [];
  customKeys = [];
  delimiter = '$$'
  customizeImg = null;
  cssSelector = '';
  data = Map;

  constructor(data) {
    data = new Map();

    this.renderId = this.newId();
    this.renderCodes.set(this.renderId, this);

    if(!data) return;
    this.parse(data)
  }

  get db() {
    return this.data;
  }

  has(key) {
    return this.db.has(key);
  }

  get(key, defaultValue) {
    return !this.has(key) ? defaultValue : this.db.get(key);
  }

  setRenderCode() {
    this.renderCodes.set('renderCodes', this.renderId);

    return this;
  }

  getByRenderCode(id) {
    return this.renderCodes.get(id);
  }

  get renderCodes() {
    if(!(window.renderCodes instanceof Map)) window.renderCodes = new Map();

    return window.renderCodes;
  }

  get isCustomizeImg() {
    return this.customizeImg instanceof Function;
  }

  get newImg() {
    return new CustomImage();
  }

  newId(size = 21) {
    return nanoid(size);
  }

  set imgTemplate(str) {
    this.img.template = str;
  }

  on(eventName, selector, eventHandler) {
    document.body.addEventListener(eventName, e => {
      if(e.target.matches(selector))
        eventHandler();
    })
  }

  parse(data) {
    if(data instanceof Espn) data = data.toObject;

    // TODO:  Finish reorganizing the data to be read from Map instead of Object.
    for(let key of this.keys) {
      this[key] = '';
    }

    for(let key of this.keys) {
      this[key] = get(data, key, null);
    }

    this.imgElement = new CustomImage();

    if(this.outerHTML) this.render();

    return this
  }

  container(cssSelector) {
    this.cssSelector = cssSelector;

    return this;
  }

  get containerElement() {
    return document.querySelector(this.cssSelector);
  }

  render(cssSelector = null) {
    if(cssSelector) this.container(cssSelector);

    if(!this.containerElement)
      return console.log('A container has not been set.');

    if(!this.outerHTML)
      this.outerHTML = this.containerElement.outerHTML;

    let outerHTML = this.outerHTML;
    let keys = [].concat(this.keys, this.customKeys);

    for(let key of keys) {
      outerHTML = outerHTML.replaceAll(`${this.delimiter}${key}${this.delimiter}`, this[key])
    }

    this.containerElement.outerHTML = outerHTML;
    this.containerElement.setAttribute('render-by', this.renderId);
    return this;
  }

  replace(str, replaceObj) {
    let newString = str;
    let keys = Object.keys(replaceObj);
    let values = Object.values(replaceObj);

    for(let i in keys) {
      let key = keys[i];
      let value = values[i];

      newString = newString.replaceAll(key, value);
    }

    return newString;
  }

  get toObject() {
    let obj = {};
    _.each(this.keys, key => {
      obj[key] = this[key];
    })

    return obj;
  }

  toString() {
    return JSON.stringify(this.toObject);
  }
}

export { Espn }
