const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['cat', 'dog', 'bird', 'fish', 'snake']
  },
  breed: { type: String, required: false },
  catchPhrase: { type: String, required: false, maxlength: 140 }
});

module.exports = mongoose.model('Pet', petSchema);
