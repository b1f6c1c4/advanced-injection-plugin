const PatternBase = require('./PatternBase');

class InlineJs extends PatternBase {
  constructor(filter, { ...other } = {}) {
    super(filter, { other });
  }

  emit(entry, asset) {
    return `<script type="application/javascript">
${asset.source()}
</script>`;
  }
}

module.exports = InlineJs;
