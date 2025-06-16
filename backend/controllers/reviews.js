const Review = require('../models/review');

module.exports = {
  index,
  create,
  update,
  delete: deleteReview,
};

async function index(req, res) {
  try {
    const reviews = await Review.find({ game: req.params.gameId }).populate('reviewer', 'username');
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to Fetch Reviews' });
  }
}

async function create(req, res) {
  try {
    req.body.reviewer = req.user._id;
    req.body.game = req.params.gameId;
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Create Review' });
  }
}

async function update(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review Not Found' });
    if (!review.reviewer.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You Cannot Do That!' });
    }
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Update Review' });
  }
}

async function deleteReview(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review Not Found' });
    if (!review.reviewer.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You Cannot Do That!' });
    }
    await review.deleteOne();
    res.json({ message: 'Review Deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to Delete Review' });
  }
}

