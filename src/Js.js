const PatternBase = require('./PatternBase');

class Js extends PatternBase {
  constructor(filter, { ...other } = {}) {
    super(filter, { other });
  }

  emit(entry) {
    return `<script href="${entry}" type="application/javascript"></script>`;
  }
}

module.exports = Js;
