const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: { type: String, required: true },
    developer: String,
    platform: String,
    releaseDate: Date,
    coverImageUrl: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Game', gameSchema);