const fs = require('fs');
const path = require('path');
const PatternBase = require('./PatternBase');
const makeAttr = require('./makeAttr');

class AsyncCss extends PatternBase {
  constructor(filter, { attr, finalAttr, ...other } = {}) {
    super(filter, { other });
    this.attr = attr;
    this.finalAttr = finalAttr;
    this.cssPreload = fs.readFileSync(path.join(__dirname, '../node_modules/fg-loadcss/dist/cssrelpreload.min.js'), 'utf-8');
  }

  emit(entry) {
    this.emitted = true;
    const attr = makeAttr({
      rel: 'preload',
      as: 'style',
      href: entry,
      onload: 'this.onload=null;this.rel=\'stylesheet\'',
    }, this.attr);
    return `<link${attr}>`;
  }

  finalEmit() {
    if (this.emitted) {
      const attr = makeAttr({
        type: 'application/javascript',
      }, this.finalAttr);
      return `<script${attr}>${this.cssPreload}</script>`;
    }
    return undefined;
  }
}

module.exports = AsyncCss;
