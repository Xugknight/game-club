const BASE_URL = 'https://api.rawg.io/api/games';
const KEY = process.env.RAWG_API_KEY;

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

module.exports = { searchGames };