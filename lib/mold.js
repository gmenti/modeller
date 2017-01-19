const Field = require('./field');

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
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this);
      const errors = {};

      let hasError = false;

      const process = (index) => {
        if (index < keys.length) {
          const key = keys[index];

          this[key].test(map[key]).then(() => {
            process(index + 1);
          }).catch((error) => {
            errors[key] = error;
            hasError = true;
            process(index + 1);
          });
        } else if (hasError) {
          reject(errors);
        } else {
          resolve();
        }
      };

      process(0);
    });
  }
}

module.exports = Mold;
