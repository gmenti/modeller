const rules = require('./rules');

/**
 * Method to replace jobs keys to jobs function in map values.
 *
 * @param  {Object} map
 * @return {Object} fields
 */
const loadFields = (map) => {
  const fields = {};

  Object.keys(map).forEach((key) => {
    fields[key] = [];

    map[key].split('|').forEach((rule) => {
      let params;
      const brokenString = rule.split(':');

      const ruleName = brokenString[0];

      if (brokenString.length > 1) {
        params = brokenString[1].split(',');

        if (params.length === 1) {
          params = params[0];
        }
      }

      fields[key].unshift({
        error: rule,
        test: (value) => {
          if (!value && rule !== 'required') {
            return true;
          }

          if (rules[ruleName]) {
            return (rules[ruleName](value, params));
          }

          return true;
        },
      });
    });
  });

  return fields;
};

/**
 * Execute jobs of specific field in fields object.
 *
 * @param  {Object} fields
 * @param  {Object} mapValues
 * @param  {Function} asyncValidation
 * @return {Promise}
 */
const execute = (fields, mapValues, asyncValidation) => new Promise((resolve, reject) => {
  let hasError = false;
  const errors = {};

  Object.keys(fields).forEach((key) => {
    const jobs = fields[key];

    jobs.every((job) => {
      if (job.test(mapValues[key])) {
        return false;
      }

      errors[key] = job.error;
      hasError = true;

      return true;
    });
  });

  if (hasError) {
    reject(errors);
  } else if (asyncValidation) {
    asyncValidation(mapValues).then(() => {
      resolve();
    }).catch((error) => {
      errors[error.key] = error.value;
      reject(errors);
    });
  } else {
    resolve();
  }
});

class Modeller {
  /**
   * Constructor of validator instance.
   *
   * @param {Object} map
   * @param {Function | undefined} asyncValidation
   */
  constructor(map, asyncValidation = undefined) {
    this.fields = loadFields(map);
    this.asyncValidation = asyncValidation;
  }

  /**
   * Check if the param values is valid.
   *
   * @param {Object} values
   * @returns {Promise}
   */
  test(values) {
    return execute(this.fields, values, this.asyncValidation);
  }

  /**
   * Register a callback validator.
   *
   * @param key
   * @param callback
   */
  static register(key, callback) {
    rules[key] = callback;
  }
}

module.exports = Modeller;
