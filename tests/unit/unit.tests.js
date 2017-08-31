const { assert } = require('chai');
const Pet = require('../../src/models/Pet');
const Rave = require('../../src/models/Rave');

describe('Pet model tests', () => {
  const petModelValid = new Pet({
    name: 'Chet',
    type: 'snake',
    breed: 'water moccasin',
    catchPhrase:
      "I am a snake. I cannot drive a car because I get bad road rage. I can't work the pedals or steer. I prefer to ride in a motorcycle sidecar."
  });
  const petModelInvalid = new Pet({
    name: 'Dweezil',
    type: 'weasel',
    breed: 'breed number 8',
    catchPhrase:
      'My parents thought it would be funny to name me Dweezil Weasel. They were wrong.'
  });

  it('Pet model passes validation', async () => {
    const passPetValidate = await petModelValid
      .validate(res => {
        assertEqual(res, null);
      })
      .catch(errors => {
        assertEqual(errors, null);
      });
  }),
    it('Pet model fails validation', async () => {
      const failPetValidate = await petModelInvalid
        .validate(res => {
          const { name, message } = res.errors;
          assert.equal(name, 'ValidatorError');
          assert.equal(message,'Pet validation failed: type: `weasel` is not a valid enum value for path `type`.');
        })
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
  const raveModelValid = new Rave({
    pet: '59a8631a91507a2afe0f62fe',
    comments: 'From SF to London, we’ve got one hell of a team that just can’t stop growing. We’re collaborators, innovators, friends, and for a month each year, travel buddies. Meet our team of rockstars who eager to rid the world of expense reports that suck!',
    email: 'PET@PETME.COM'
  });
  const raveModelInvalid = new Rave({
    pet: '59a8631a91507a2afe0f62fe',
    comments: '',
    email: 'PET@PETME.COM'
  });

  it('Rave model passes validation', async () => {
    const passRaveValidate = await raveModelValid
    .validate(res => {
      assertEqual(res, null);
    })
    .catch(errors => {
      assertEqual(errors, null);
    });
  }),
    it('Rave model fails validation', async () => {
      const failRaveValidate = await raveModelInvalid
      .validate(res => {
        const { name, message } = res.errors;
        assert.equal(name, 'ValidatorError');
        assert.equal(message,'Path `comments` is required.');
      })
      .catch(errors => {
        ({ errors }) => {
          console.log(errors)
          const { name, message } = errors;
          assert.equal(name, 'ValidationError');
          assert.equal(
            message,
            'Pet validation failed: type: `weasel` is not a valid enum value for path `type`.'
          );
        };
      });
    });
});
