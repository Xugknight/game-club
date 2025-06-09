const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max:5, required: true },
    content: String,
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Review', reviewSchema);