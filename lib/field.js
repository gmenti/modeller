const Job = require('./job');

class Field {
  /**
   * Constructor of field instance.
   *
   * @param {String} name
   */
  constructor(name) {
    this.name = name;
    this.jobs = [];
  }

  /**
   * Load jobs with string rules.
   *
   * @param {String} rules
   */
  loadRules(rules) {
    rules.split('|').forEach((rule) => {
      this.addJob(new Job(rule));
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
    const promises = [];

    this.jobs.forEach((job) => {
      promises.push(job.execute(value));
    });

    return Promise.all(promises);
  }
}

module.exports = Field;
