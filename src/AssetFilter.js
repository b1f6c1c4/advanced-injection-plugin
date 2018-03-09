const _ = require('lodash');
const match = require('./match');

class AssetFilter {
  constructor(filter, { prefix } = {}) {
    this.filter = filter;
    this.prefix = prefix;
  }

  match(name) {
    let n = name;
    if (this.prefix && n.startsWith(this.prefix)) {
      n = n.substr(this.prefix.length);
    }

    return match(this.filter, n);
  }

  apply({ assets }) {
    return _.keys(assets).filter((a) => this.match(a));
  }
}

module.exports = AssetFilter;
