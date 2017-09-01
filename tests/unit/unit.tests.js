const { assert } = require('chai');
const {petModelValid, petModelInvalid, raveModelValid, raveModelInvalid } = require('../helpers/test-helper')

describe('Pet model tests', () => {
  it('Pet model passes validation', async () => {
    const passPetValidate = await petModelValid
      .validate(res => {
        assert.isNull(res);
      })
      .catch(errors => {
        assert.isNull(errors);
      });
  }),
  it('Pet model fails validation', async () => {
    const failPetValidate = await petModelInvalid
      .validate(() => {})
      .catch(errors => {
        ({ errors }) => {
          const { name, message } = errors;
          assert.equal(name, 'ValidatorError');
          assert.equal(message, 'Pet validation failed: type: `weasel` is not a valid enum value for path `type`.');
        };
      });
  });
});

describe('Rave model tests', () => {
  it('Rave model passes validation', async () => {
    const passRaveValidate = await raveModelValid
    .validate(res => {
      assert.isNull(res);
    })
    .catch(errors => {
      assert.isNull(errors);
    });
  }),
  it('Rave model fails validation', async () => {
    const failRaveValidate = await raveModelInvalid
    .validate(() => {})
    .catch(errors => {
      ({ errors }) => {
        const { name, message } = errors;
        assert.equal(name, 'ValidationError');
        assert.equal(message, 'Pet validation failed: type: `weasel` is not a valid enum value for path `type`.');
      };
    });
  });
});
