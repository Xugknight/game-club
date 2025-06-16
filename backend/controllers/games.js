const Game = require('../models/game');

module.exports = {
  index,
  show,
  create,
  update,
  delete: deleteGame
};

async function index(req, res) {
  try {
    const games = await Game.find({})
    .sort({ releaseDate: -1 });
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to Fetch Games' });
  }
};

async function show(req, res) {
  try {
    const game = await Game.findById(req.params.gameId).populate('createdBy', 'username');
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Fetch Game' });
  }
};

async function create(req, res) {
  try {
    if (req.body.rawgId) {
      const exists = await Game.findOne({ rawgId: req.body.rawgId });
      if (exists) return res.status(409).json({ message: 'Game Already Exists' });
    }
    const dupe = await Game.findOne({
      title:       req.body.title,
      releaseDate: req.body.releaseDate
    });
    if (dupe) return res.status(409).json({ message: 'Game Already Exists' });

    req.body.createdBy = req.user._id;
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate Key'})
    }
    res.status(400).json({ message: 'Failed to Create Game' });
  }
};

async function update(req, res) {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: 'Game Not Found' });
    if (!game.createdBy.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You Cannot Do That!' });
    }
    Object.assign(game, req.body);
    await game.save();
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Update Game' });
  }
};

async function deleteGame(req, res) {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: 'Game Not Found' });
    if (!game.createdBy.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You Cannot Do That!' });
    }
    await game.deleteOne();
    res.json({ message: 'Game Deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Update Game' });
  }
};