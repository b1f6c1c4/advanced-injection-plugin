const _ = require('lodash');
const he = require('he');

module.exports = (...args) => _.chain({})
  .merge(...args)
  .toPairs()
  .map(([key, val]) => {
    if (!val) {
      return undefined;
    }
    if (val === true) {
      return ` ${key}`;
    }
    return ` ${key}="${he.encode(val)}"`;
  })
  .join('')
  .value();
