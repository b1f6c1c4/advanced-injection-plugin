const _ = require('lodash');

class AssetFilter {
  constructor(filter, { prefix }) {
    this.filter = filter;
    this.prefix = prefix;
  }

  match(name) {
    let n = name;
    if (this.prefix && n.startsWith(this.prefix)) {
      n = n.substr(this.prefix.length);
    }

    function rawMatch(filter) {
      if (_.isString(filter)) {
        return n === filter;
      }
      if (_.isArray(filter)) {
        return _.some(filter, (f) => rawMatch(f));
      }
      return filter.test(n);
    }

    return rawMatch(this.filter);
  }

  apply({ assets }) {
    return _.keys(assets).filter((a) => this.match(a));
  }
}

module.exports = AssetFilter;
