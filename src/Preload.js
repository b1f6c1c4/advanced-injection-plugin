const PatternBase = require('./PatternBase');

class Preload extends PatternBase {
  constructor(filter, { as, ...other }) {
    super(filter, { other });
    this.as = as;
  }

  emit(entry) {
    if (this.as) {
      return `<link rel="preload" as="${this.as}" href="${entry}">`;
    }
    return `<link rel="preload" href="${entry}">`;
  }
}

module.exports = Preload;
