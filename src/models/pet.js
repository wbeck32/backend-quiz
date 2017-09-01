const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['cat', 'dog', 'bird', 'fish', 'snake']
  },
  breed: { type: String, required: false },
  catchPhrase: { type: String, required: false, maxlength: 140 },
  rave:[ { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Rave' }]
});

module.exports = mongoose.model('Pet', petSchema);
