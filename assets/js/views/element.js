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
    let attributes = ''
    let closing = '';
    let tag = this.tagName.toLowerCase();

    each(this.attributes, (v, k) => {
      attributes += `${k}="${v}"`;
    })

    if(this.selfClose) {
       closing = ' />';
    } else {
      closing = `>${this.content}</${tag}>`;
    }
    return `<${tag} ${attributes}${closing}`;
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
