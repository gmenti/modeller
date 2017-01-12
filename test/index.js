const Moldeler = require('../lib/index');

const asyncValidation = () => new Promise((resolve, reject) => {
  resolve();
  reject({
    key: 'email',
    value: 'unique',
  });
});

const peopleValidator = new Moldeler({
  name: 'string',
  age: 'integer|size:6,9',
}, asyncValidation);

describe('Validator tests', () => {

  it('validator must be a valid', (done) => {
    peopleValidator.test({
      name: 'Giuseppe',
      age: 7,
    }).then(() => {
      done();
    }).catch((errors) => {
      console.log(errors);
      done('validator is invalid');
    });
  });

	it('validator must be a invalid', (done) => {
    peopleValidator.test({
      name: null,
      age: 10,
    }).then(() => {
      done('validator is valid');
    }).catch(() => {
      done();
    });
	});

});
