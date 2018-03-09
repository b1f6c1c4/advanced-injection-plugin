const PatternBase = require('./PatternBase');

class InlineCss extends PatternBase {
  constructor(filter, { ...other } = {}) {
    super(filter, { other });
  }

  emit(entry, asset) {
    return `<style type="text/css">
${asset.source()}
</style>`;
  }
}

module.exports = InlineCss;
