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
  }),
  birdPet: new Pet({
    name: 'Purdy',
    type: 'bird',
    breed: 'African parrot',
    catchPhrase: 'I want a cracker. Whole-grain preferably.'
  }),
  fishPet: new Pet({
    name: 'Wallace',
    type: 'fish',
    breed: 'koi',
    catchPhrase: 'I will eat your dog.'
  }),
  raveOne: new Rave({
    pet: '',
    comments:
      'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armo',
    email: 'PET@PETME.COM'
  }),
  raveTwo: new Rave({
    pet: '',
    comments:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by',
    email: 'tokenJoe@token.com'
  }),
  raveThree: new Rave({
    pet: '',
    comments:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    email: 'LARRY@koala.com'
  }),
  raveFour: new Rave({
    pet: '',
    comments:
      'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so.',
    email: 'lovePetz@example.com'
  })
};
