const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class Js extends PatternBase {
  constructor(filter, { attr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
  }

  emit(entry) {
    const attr = makeAttr({
      src: entry,
      type: 'application/javascript',
    }, this.attr);
    return `<script${attr}></script>`;
  }
}

module.exports = Js;
