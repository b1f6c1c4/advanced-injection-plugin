const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class Prefetch extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry) {
    const attr = makeAttr({
      rel: 'prefetch',
      href: entry,
    }, this.attr);
    return `<link${attr}>`;
  }
}

module.exports = Prefetch;
