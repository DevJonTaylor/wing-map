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
    if(!data) return;
    this.parse(data)
  }

  get toObject() {
    return (this.data instanceof Map) ? Object.fromEntries(this.data) : {};
  }

  get renderId() {
    if(!this.has('renderId')) {
      this.set('renderId', this.newId())
    }

    return this.get('renderId');
  }

  get db() {
    return this.data;
  }

  has(key) {
    return this.db.has(key);
  }

  set(key, value) {
    this.db.set(key, value);
  }

  get(key, defaultValue) {
    return !this.has(key) ? defaultValue : this.db.get(key);
  }

  setRenderCode() {

    this.renderCodes.set('renderCodes', this.renderId);

    return this;
  }

  removeRenderCode(renderId) {
    if(this.renderCodes.has(renderId))
        this.renderCodes.delete(renderId);

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

  get containerElement() {
    return document.querySelector(this.cssSelector);
  }

  newId(size = 21) {
    return nanoid(size);
  }

  on(eventName, selector, eventHandler) {
    document.body.addEventListener(eventName, e => {
      if(e.target.matches(selector))
        eventHandler();
    })
  }

  parse(data) {
    const isEspn = (data instanceof Espn);
    if(isEspn) {
      data.removeRenderCode(data.renderId);
      data = data.toObject;
    } else {
      if(Array.isArray(data)) {
        const newObj = {};
        const keys = [...new Set(this.keys.concat(this.customKeys))];
        keys.map((v, i) => {
          const key = keys[i];
          newObj[key] = data[i];
        })

        this.keys = keys;
        this.data = new Map(Object.entries(newObj));
        return this;
      }
      this.data = new Map(Object.entries(data));
    }

    if(this.outerHTML) this.render();

    this.keys.map(key => {
      Object.defineProperty(this, key, { get() { return this.get(key) }});
    })

    return this
  }

  container(cssSelector) {
    this.cssSelector = cssSelector;

    return this;
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

    this.setRenderCode();
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

  toString() {
    return JSON.stringify(this.toObject);
  }
}

export { Espn }
