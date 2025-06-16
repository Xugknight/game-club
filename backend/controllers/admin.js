const Game = require('../models/game');
const Review = require('../models/review');
const Flag = require('../models/flag');

module.exports = {
  getAllGames,
  getAllReviews,
  getAllFlags,
  deleteGame,
  deleteReview,
  resolveFlag
};

async function getAllGames(req, res) {
  try {
    const games = await Game.find({}).populate('createdBy', 'username')
    res.json(games)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could Not Fetch Games' })
  }
};

async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find({})
      .populate('reviewer', 'username')
      .populate('game', 'title')
    res.json(reviews)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could Not Fetch Reviews' })
  }
};

async function getAllFlags(req, res) {
  try {
    const flags = await Flag.find({})
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .lean()

    const enriched = await Promise.all(flags.map(async flag => {
      let preview = ''
      if (flag.contentType === 'Review') {
        const rv = await Review.findById(flag.contentId).select('content').lean()
        preview = rv?.content?.slice(0, 100) + (rv?.content?.length > 100 ? '…' : '')
          || '[review deleted]'
      } else {
        const gm = await Game.findById(flag.contentId).select('title').lean()
        preview = gm?.title || '[game deleted]'
      }
      return {
        ...flag,
        contentPreview: preview
      }
    }))

    res.json(enriched)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could Not Get Flags' })
  }
};

async function deleteGame(req, res) {
  try {
    await Game.findByIdAndDelete(req.params.gameId)
    res.json({ message: 'Game Deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to Delete' })
  }
};

async function deleteReview(req, res) {
  try {
    await Review.findByIdAndDelete(req.params.reviewId)
    res.json({ message: 'Review Deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to Delete' })
  }
};

async function resolveFlag(req, res) {
  try {
    await Flag.findByIdAndDelete(req.params.flagId)
    res.json({ message: 'Flag Resolved' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to Resolve Flag' })
  }
};