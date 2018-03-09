const _ = require('lodash');
const match = require('./match');

class AssetFilter {
  constructor(filter, { prefix } = {}) {
    this.filter = filter;
    this.prefix = prefix;
  }

  match(name, prefix = this.prefix) {
    let n = name;
    if (prefix && n.startsWith(prefix)) {
      n = n.substr(prefix.length);
    }

    return match(this.filter, n);
  }

  apply({ assets }, ...args) {
    return _.keys(assets).filter((a) => this.match(a, ...args));
  }
}

module.exports = AssetFilter;
