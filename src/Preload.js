const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class Preload extends PatternBase {
  constructor(filter, { as, attr, ...other } = {}) {
    super(filter, { other });
    this.as = as;
    this.attr = attr;
  }

  emit(entry) {
    const attr = makeAttr({
      rel: 'preload',
      as: this.as,
      href: entry,
    }, this.attr);
    return `<link${attr}>`;
  }
}

module.exports = Preload;
