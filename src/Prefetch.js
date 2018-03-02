const PatternBase = require('./PatternBase');

class Prefetch extends PatternBase {
  constructor(filter, { ...other }) {
    super(filter, { other });
  }

  emit(entry) {
    return `<link rel="prefetch" href="${entry}">`;
  }
}

module.exports = Prefetch;
