const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flagSchema = new Schema({
    contentType: { type: String, enum: ['Game', 'Review'], required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flag', flagSchema);