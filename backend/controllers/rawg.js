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

function formatDate(d) {
  return d.toISOString().split('T')[0];
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

module.exports = { searchGames, trendingGames };