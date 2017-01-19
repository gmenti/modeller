global.Promise = require('bluebird');

const Mold = require('./mold');
const rules = require('./rules');

/**
 * Create a new mold.
 *
 * @param {Object} map
 */
const createMold = map => new Mold(map);

/**
 * Register a new rule.
 *
 * @param {String} key
 * @param {Function} callback
 */
const register = (key, callback) => {
  rules[key] = callback;
};

module.exports = {
  createMold,
  register,
};
