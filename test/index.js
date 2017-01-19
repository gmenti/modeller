const Modeller = require('../lib/index');

const dogMold = Modeller.createMold({
  name: 'required|string',
  age: 'integer|size:0,30',
});

describe('Validator tests', () => {

  it('validator must be a valid', (done) => {
    dogMold.test({
      name: 'Rex',
      age: 7,
    }).then(() => {
      done();
    }).catch((errors) => {
      console.log(errors);
      done('validator is invalid');
    });
  });

	it('validator must be a invalid', (done) => {
    dogMold.test({
      name: undefined,
      age: 10,
    }).then(() => {
      done('validator is valid');
    }).catch((errors) => {
      done();
    });
	});

});
