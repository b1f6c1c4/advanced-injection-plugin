const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class InlineJs extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry, asset) {
    const attr = makeAttr({
      type: 'application/javascript',
    }, this.attr);
    return `<script${attr}>
${asset.source()}
</script>`;
  }
}

module.exports = InlineJs;
