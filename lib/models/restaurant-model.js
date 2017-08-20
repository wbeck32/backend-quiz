const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    comments: { type: String, required: true, maxlength: 250 },
    email: { type: String, required: true, lowercase: true }
}, { runSettersOnQuery: true });


const restaurantSchema = new Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String }
    },
    cuisine: { type: String, required: true, enum: ['asian', 'euro', 'northwest', 'comfort', 'other'] },
    reviews: { type: Array, reviewSchema, required: false }
})

module.exports = mongoose.model('Restaurant', restaurantSchema);