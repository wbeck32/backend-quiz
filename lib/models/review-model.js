const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    comments: { type: String, required: true },
    email: { type: String, required: true, lowercase: true }
}, { runSettersOnQuery: true });

module.exports = mongoose.Model('Review', reviewSchema);