const BASE_URL = 'https://api.rawg.io/api/games';
const KEY = process.env.RAWG_API_KEY;
const Game = require('../models/game');

async function searchGames(req, res) {
    try {
        const { search = '', page = 1 } = req.query;
        const url = `${BASE_URL}?key=${KEY}` + `&search=${encodeURIComponent(search)}` + `&page=${page}&page_size=20`;
        const apiRes = await fetch(url);
        if (!apiRes.ok) throw new Error(apiRes.statusText);
        const data = await apiRes.json();
        res.json(data);
    } catch (err) {
        console.log('RAWG error: ', err);
        res.status(502).json({ message: 'Failed to Fetch from RAWG' });
    }
};

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function trendingGames(req, res) {
    try {
        const { page =1 } = req.query;
        const today     = new Date();
        const last90 = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        const datesParam = `${formatDate(last90)},${formatDate(today)}`;
        const url =
        `${BASE_URL}` + 
        `?key=${KEY}` + 
        `&dates=${datesParam}` + 
        `&ordering=-added` + 
        `&page=${page}` + 
        `&page_size=20`;

        const apiRes = await fetch(url);
        if (!apiRes.ok) throw new Error(apiRes.statusText);
        const data = await apiRes.json();
        return res.json(data);
    } catch (err) {
        console.log('RAWG Trending error: ', err);
        res.status(502).json({ message: 'Failed to Fetch Trending from RAWG' });
    }
};

async function importGame(req, res) {
    try {
        const rawgId = Number(req.params.rawgId);
        let game = await Game.findOne({ rawgId });
        if (game) return res.json(game);

        const detailRes = await fetch(`${BASE_URL}/${rawgId}?key=${KEY}`);
        const gameDetails = await detailRes.json();

        const gameData = {
            rawgId: gameDetails.id,
            title: gameDetails.name,
            developer: gameDetails.developers?.map(dev => dev.name).join(', ') || 'Unknown',
            platform: gameDetails.platforms?.[0]?.platform?.name || 'Unknown',
            releaseDate: gameDetails.released,
            coverImageUrl: gameDetails.background_image || '',
            description: gameDetails.description_raw || '',
            createdBy: req.user._id
        };

        game = await Game.create(gameData);
        res.status(201).json(game);
    } catch (err) {
        console.log('RAWG Import Error:', err);
        res.status(502).json({ message: 'Failed to Import Game from RAWG' });
    }
};

module.exports = { searchGames, trendingGames, importGame };