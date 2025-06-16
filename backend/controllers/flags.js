const Flag = require('../models/flag');

module.exports = {
  flagGame,
  flagReview,
  checkGameFlag,
  checkReviewFlag
};

async function flagGame(req, res) {
  const { gameId } = req.params;
  const exists = await Flag.exists({
    contentType: 'Game',
    contentId:   gameId
  });
  if (exists) return res.status(409).json({ message: 'Already Requested' });
  const flag = await Flag.create({
    contentType:'Game',
    contentId:  gameId,
    user:       req.user._id,
    reason:     req.body.reason
  });
  res.status(201).json(flag);
};

async function flagReview(req, res) {
  const { reviewId } = req.params;
  const exists = await Flag.exists({
    contentType: 'Review',
    contentId:   reviewId
  });
  if (exists) return res.status(409).json({ message: 'Already Requested' });
  const flag = await Flag.create({
    contentType:'Review',
    contentId:  reviewId,
    user:       req.user._id,
    reason:     req.body.reason
  });
  res.status(201).json(flag);
};

async function checkGameFlag(req, res) {
  const { gameId } = req.params;
  const pending = await Flag.exists({ contentType:'Game', contentId:gameId });
  res.json({ pending: Boolean(pending) });
};

async function checkReviewFlag(req, res) {
  const { reviewId } = req.params;
  const pending = await Flag.exists({ contentType:'Review', contentId:reviewId });
  res.json({ pending: Boolean(pending) });
};