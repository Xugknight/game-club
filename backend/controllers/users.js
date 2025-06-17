const User = require('../models/user');
const Game = require('../models/game');
const user = require('../models/user');

module.exports = {
    getProfile,
    addFavorite,
    removeFavorite,
    getFavorites
};

async function getProfile(req, res) {
    const user = await User.findById(req.params.userId)
    .select('username')
    .populate('favorites', 'title coverImageUrl');
    if (!user) return res.status(404).json({ message: 'User Not Found' });
    res.json(user);
};

async function getFavorites(req, res) {
    const user = await User.findById(req.params.userId)
    .populate('favorites');
    res.json(user?.favorites || []);
};

async function addFavorite(req, res) {
    const user = await User.findById(req.user._id);
    if (user.favorites.includes(req.params.gameId)) {
        return res.status(409).json({ message: 'Game Already in Favorites' });
    }
    user.favorites.push(req.params.gameId);
    await user.save();
    res.json(user.favorites);
};

async function removeFavorite(req, res) {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(id => id.toString() !== req.params.gameId);
    await user.save();
    res.json(user.favorites);
};