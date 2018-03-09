const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class AsyncCss extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry) {
    const attr = makeAttr({
      rel: 'preload',
      as: 'style',
      href: entry,
      onload: 'this.onload=null;this.rel=\'stylesheet\'',
    }, this.attr);
    return `<link${attr}>`;
  }
}

module.exports = AsyncCss;
