const Flag = require('../models/flag');

async function flagGame(req, res) {
    const { gameId } =req.params;
    const flagExists = await Flag.findOne({ contentType:'Game', contentId:gameId, user:req.user._id });
    if (flagExists) return res.json({ message: 'Already Flagged' });
    const flag = await Flag.create({
        contentType:'Game',
        contentId: gameId,
        user: req.user._id,
        reason: req.body.reason
    });
    res.status(201).json(flag);
};

async function flagReview(req, res) {
    const { reviewId } =req.params;
    const flagExists = await Flag.findOne({ contentType:'Review', contentId:reviewId, user:req.user._id });
    if (flagExists) return res.json({ message: 'Already Flagged' });
    const flag = await Flag.create({
        contentType:'Review',
        contentId: reviewId,
        user: req.user._id,
        reason: req.body.reason
    });
    res.status(201).json(flag);
};

module.exports = { flagGame, flagReview };