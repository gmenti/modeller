const Job = require('./job');
const rules = require('./rules');

class Field {
  /**
   * Constructor of field instance.
   *
   * @param {String} name
   */
  constructor(name) {
    this.isNullable = true;
    this.name = name;
    this.jobs = [];
  }

  /**
   * Load jobs with string rules.
   *
   * @param {String} stringRules
   */
  loadRules(stringRules) {
    stringRules.split('|').forEach((stringRule) => {
      if (stringRule === rules.required.name) {
        this.isNullable = false;
      }

      this.addJob(new Job(stringRule));
    });
  }

  /**
   * Add job to field.
   *
   * @param {Job} job
   */
  addJob(job) {
    this.jobs.push(job);
  }

  /**
   * Test all jobs of this field.
   *
   * @param {*} value
   * @returns {Promise}
   */
  test(value) {
    const shouldValidate = !(!rules.required(value) && this.isNullable);
    const promises = [];

    if (shouldValidate) {
      this.jobs.forEach((job) => {
        promises.push(job.execute(value));
      });
    }

    return Promise.all(promises);
  }
}

module.exports = Field;
