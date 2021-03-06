const _ = require('lodash');
const AssetFilter = require('./AssetFilter');

class PatternBase {
  constructor(filter, { ...other }) {
    this.filter = new AssetFilter(filter, { other });
  }

  apply(compilation, filename, ...args) {
    const assetNames = this.filter.apply(compilation, ...args);
    const results = [];
    const path = compilation.outputOptions.publicPath || '/';
    assetNames.forEach((n) => {
      const res = this.emit(path + n, compilation.assets[n], n, filename);
      if (_.isArray(res)) {
        results.push(...res);
      } else if (res) {
        results.push(res);
      }
    });
    return results;
  }

  // eslint-disable-next-line no-unused-vars
  emit(entry, asset, name, filename) {
    // To be overriden
    return `<!-- ${name} -->`;
  }
}

module.exports = PatternBase;
