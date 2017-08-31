const Pet = require('../../src/models/Pet');
const Rave = require('../../src/models/Rave');

module.exports = {
  petModelValid: new Pet({
    name: 'Chet',
    type: 'snake',
    breed: 'water moccasin',
    catchPhrase:
      "I am a snake. I cannot drive a car because I get bad road rage. I can't work the pedals or steer. I prefer to ride in a motorcycle sidecar."
  }),
  petModelInvalid: new Pet({
    name: 'Dweezil',
    type: 'weasel',
    breed: 'breed number 8',
    catchPhrase:
      'My parents thought it would be funny to name me Dweezil Weasel. They were wrong.'
  }),
  raveModelValid: new Rave({
    pet: '59a8631a91507a2afe0f62fe',
    comments:
      'From SF to London, we’ve got one hell of a team that just can’t stop growing. We’re collaborators, innovators, friends, and for a month each year, travel buddies. Meet our team of rockstars who eager to rid the world of expense reports that suck!',
    email: 'PET@PETME.COM'
  }),
  raveModelInvalid: new Rave({
    pet: '59a8631a91507a2afe0f62fe',
    comments: '',
    email: 'PET@PETME.COM'
  })
};
