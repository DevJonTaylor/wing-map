import { each } from 'lodash';

class CustomElement {
  tagName = '';
  attributes = {};
  selfClose = false
  content = '';


  constructor(tag, selfClose) {
    this.tagName = tag.toUpperCase();
    this.selfClose = selfClose;

  }

  get toHTML() {
    let attributes = []
    let closing = '';
    let tag = this.tagName.toLowerCase();

    for(const [key, val] of Object.entries(this.attributes)) {
      attributes.push(`${key}="${val}"`);
    }

    if(this.selfClose) {
       closing = ' />';
    } else {
      closing = `>${this.content}</${tag}>`;
    }
    return `<${tag} ${attributes.join(' ')}${closing}`;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
    return this;
  }

  getAttribute(name) {
    return this.attributes[name]
  }

  toString() {
    return this.toHTML;
  }


}

export { CustomElement };
