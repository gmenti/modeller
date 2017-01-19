const rules = require('./rules');

class Job {
  /**
   * Constructor of job instance.
   *
   * @param {String} rule
   */
  constructor(rule) {
    let params;
    const brokenString = rule.split(':');
    const ruleName = brokenString[0];

    if (brokenString.length > 1) {
      params = brokenString[1].split(',');

      if (params.length === 1) {
        params = params[0];
      }
    }

    this.method = rules[ruleName];
    this.params = params;
  }

  /**
   * Return error message of job.
   *
   * @returns {Array}
   */
  getError() {
    if (this.params) {
      return [this.method.name, this.params];
    }

    return [this.method.name];
  }

  /**
   * Execute job to check if value is valid.
   *
   * @param {*} value
   * @returns {Promise}
   */
  execute(value) {
    return new Promise((resolve, reject) => {
      const result = this.method(value, this.params);

      if (typeof result === 'object') {
        result.then(() => {
          resolve();
        }).catch(() => {
          reject(this.getError());
        });
      } else if (result === true) {
        resolve();
      } else {
        reject(this.getError());
      }
    });
  }
}

module.exports = Job;
