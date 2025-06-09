const Game = require('../models/game');

module.exports = {
  index,
  create
};

async function index(req, res) {
  try {
    const games = await Game.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(games);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to Fetch Games' });
  }
}

async function show(req, res) {
  try {
    const game = await Game.findById(req.params.gameId).populate('createdBy', 'username');
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to Fetch Game' });
  }
}

async function create(req, res) {
  try {
    req.body.createdBy = req.user._id;
    const game = await Game.create(req.body);
    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to Create Game' });
  }
}

async function show(req, res) {
  try {
    const game = await Game.findById(req.params.gameId).populate('createdBy', 'username');
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to Fetch Game' });
  }
}