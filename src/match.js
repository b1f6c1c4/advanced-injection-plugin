const _ = require('lodash');

function match(filter, obj) {
  if (filter === undefined) {
    return true;
  }
  if (filter === null) {
    return false;
  }
  if (_.isString(filter)) {
    return obj === filter;
  }
  if (_.isArray(filter)) {
    return _.some(filter, (f) => match(f, obj));
  }
  return filter.test(obj);
}

module.exports = match;
