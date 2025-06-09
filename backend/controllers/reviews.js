const Review = require('../models/review');

module.exports = {
  index,
  create,
  update,
  delete: deleteReview,
};

async function index(req, res) {
  try {
    const reviews = await Review.find({ game: req.params.gameId });
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}

async function create(req, res) {
  try {
    req.body.createdBy = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to creat post' });
  }
}

//TODO Placeholder functions for now, will need to go back and write properly after refactoring.
async function update(req, res) {
  try {
    req.body.createdBy = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to creat post' });
  }
}

async function deleteReview(req, res) {
  try {
    req.body.createdBy = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to creat post' });
  }
}

