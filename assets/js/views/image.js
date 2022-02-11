import {CustomElement} from "./element";

class CustomImage extends CustomElement {
  constructor() {
    super('img', true);
    this.tagName = 'img';
    this.selfClose = true;
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(str) {
    return this.setAttribute('src', str);
  }

  get alt() {
    return this.getAttribute('alt');
  }

  set alt(str) {
    this.setAttribute('alt', str);
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(str) {
    this.setAttribute('height', str);
  }

  get ismap() {
    return this.getAttribute('ismap');
  }

  set ismap(str) {
    this.setAttribute('ismap', str);
  }

  get loading() {
    return this.getAttribute('loading');
  }

  set loading(str) {
    this.setAttribute('loading', str);
  }

  get longdesc() {
    return this.getAttribute('longdesc');
  }

  set longdesc(str) {
    this.setAttribute('longdesc', str);
  }

  get referrerpolicy() {
    return this.getAttribute('referrerpolicy');
  }

  set referrerpolicy(str) {
    const restrictedTo = ['no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin','unsafe-url']

    this.setAttribute('referrerpolicy', str);
  }

  get usemap() {
    return this.getAttribute('usemap');
  }

  set usemap(str) {
    this.setAttribute('usemap', str);
  }

  get width() {
    return this.getAttribute('width');
  }

  set width(str) {
    this.setAttribute('width', str);
  }

  set crossorigin(str) {
    const restrictedTo = ['anonymous','use-credentials',]

    this.setAttribute('crossorigin', str);
  }

  get crossorigin() {
    this.getAttribute('crossorigin');
  }
}

export { CustomImage };
