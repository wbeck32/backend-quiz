const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raveSchema = new Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pet' },
    comments: { type: String, required: true, maxlength: 250 },
    email: { type: String, required: true, lowercase: true }
  },{ runSettersOnQuery: true });

module.exports = mongoose.model('Rave', raveSchema);
