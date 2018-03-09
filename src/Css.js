const PatternBase = require('./PatternBase');

class Css extends PatternBase {
  constructor(filter, { ...other } = {}) {
    super(filter, { other });
  }

  emit(entry) {
    return `<style href="${entry}" type="text/css"></style>`;
  }
}

module.exports = Css;
