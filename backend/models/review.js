const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    game: String,
    rating: Number,
    content: String,
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Game', gameSchema);