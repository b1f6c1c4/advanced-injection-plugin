const fs = require('fs');
const path = require('path');
const PatternBase = require('./PatternBase');

class AsyncCss extends PatternBase {
  constructor(filter, { ...other } = {}) {
    super(filter, { other });
    this.cssPreload = fs.readFileSync(path.join(__dirname, '../node_modules/fg-loadcss/dist/cssrelpreload.min.js'), 'utf-8');
  }

  emit(entry) {
    this.emitted = true;
    return `<link rel="preload" as="style" href="${entry}" onload="this.onload=null;this.rel='stylesheet'">`;
  }

  finalEmit() {
    if (this.emitted) {
      return `<script>${this.cssPreload}</script>`;
    }
    return undefined;
  }
}

module.exports = AsyncCss;
