const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class InlineCss extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry, asset) {
    const attr = makeAttr({
      type: 'text/css',
    }, this.attr);
    return `<style${attr}>
${asset.source()}
</style>`;
  }
}

module.exports = InlineCss;
