const Field = require('./field');

/**
 * Process mold with map of values.
 *
 * @param {Object} mold
 * @param {Object} map
 * @return {Promise}
 */
const process = Promise.coroutine(function* (mold, map) {
  let hasError = false;
  const errors = {};
  const keys = Object.keys(mold);

  /* eslint no-restricted-syntax: 0 */
  for (const key of keys) {
    try {
      yield mold[key].test(map[key]);
    } catch (error) {
      errors[key] = error;
      hasError = true;
    }
  }

  if (hasError) {
    throw errors;
  }
});

class Mold {
  /**
   * Constructor of mold instance.
   *
   * @param {Object} map
   */
  constructor(map) {
    Object.keys(map).forEach((key) => {
      this[key] = new Field(key);
      this[key].loadRules(map[key]);
    });
  }

  /**
   * Test mold with map of values.
   *
   * @param {Object} map
   * @returns {Promise}
   */
  test(map) {
    return process(this, map);
  }
}

module.exports = Mold;
