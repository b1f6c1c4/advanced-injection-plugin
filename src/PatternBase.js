const _ = require('lodash');
const AssetFilter = require('./AssetFilter');

class PatternBase {
  constructor(filter, { ...other }) {
    this.filter = new AssetFilter(filter, { other });
  }

  apply(compilation) {
    const assetNames = this.filter.apply(compilation);
    const results = [];
    const path = compilation.outputOptions.publicPath;
    assetNames.forEach((n) => {
      const res = this.emit(path + n, compilation.asset[n], n);
      if (_.isArray(res)) {
        results.push(...res);
      } else if (res) {
        results.push(res);
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  emit(entry, asset, name) {
    // To be overriden
    return `<!-- ${name} -->`;
  }

  finalEmit() {
    // To be overriden
    return undefined;
  }
}

module.exports = PatternBase;
