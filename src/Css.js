const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class Css extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry) {
    const attr = makeAttr({
      href: entry,
      type: 'text/css',
    }, this.attr);
    return `<style${attr}></style>`;
  }
}

module.exports = Css;
