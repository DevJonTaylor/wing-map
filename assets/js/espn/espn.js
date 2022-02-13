import { random } from 'lodash';

class Espn {
  keys = [];
  customKeys = [];
  delimiter = '$$'

  constructor(data) {
    this.renderId = this.hexId();
    if(!data) return;
    this.parse(data)
  }

  hexId(lng = 6) {
    const charList = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let id = '';

    for(let i = 0;i < lng;i++) {
      let n = random(0, lng);
      id += charList[n];
    }

    return id;
  }

  img = {
    template: `<img src="$$src$$" height="$$height$$" width="$$width$$" alt="$$alt$$"/>`,
    replacements: {
      $$src$$: '',
      $$alt$$: '',
      $$width$$: 100,
      $$height$$: 100
    },
    set width(str) {
      this.replacements.$$width$$ = str;
    },
    set height(str) {
      this.replacements.$$height$$ = str;
    },
    set alt(str) {
      this.replacements.$$alt$$ = str;
    }
  };

  set imgTemplate(str) {
    this.img.template = str;
  }

  on(eventName, selector, eventHandler) {
    document.body.addEventListener(eventName, e => {
      if(e.target.matches(selector))
        eventHandler();
    })
  }

  createImg(src) {
    let replacements = _.merge({}, this.img.replacements);
    replacements.$$src$$ = src;
    return this.replace(this.img.template, replacements);
  }

  parse(data) {
    if(data instanceof Espn) data = data.toObject;

    for(let key of this.keys) {
      this[key] = _.get(data, key, null);
    }

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
<<<<<<< HEAD
    let keys = Array.prototype.concat(this.keys, this.customKeys);
=======
    let keys = [...this.keys, ...this.customKeys];
>>>>>>> feature/game-logic

    for(let key of keys) {
      outerHTML = outerHTML.replaceAll(`${this.delimiter}${key}${this.delimiter}`, this[key])
    }

    this.containerElement.outerHTML = outerHTML;

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
