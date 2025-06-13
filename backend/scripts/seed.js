require('dotenv').config();
const mongoose = require('mongoose');
const fetch    = global.fetch || require('node-fetch');
const Game     = require('../models/game');
const User     = require('../models/user');

const RAWG_KEY = process.env.RAWG_API_KEY;
const MONGO_URI= process.env.MONGODB_URI;

// node backend/scripts/seed.js  <---run this in terminal

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    let seedUser = await User.findOne({ email: 'seed@localhost' });
    if (!seedUser) {
      seedUser = await User.create({ username: 'seeduser', email: 'seed@localhost', password: 'password123' });
      console.log('Created seed user:', seedUser._id);
    }

    // Build date window (e.g. last 365 days)
    const today      = new Date();
    const daysToPull = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const dates      = `${formatDate(daysToPull)},${formatDate(today)}`;

    // Parameters for pagination
    const NUM_PAGES  = 5;      // <-- how many pages to fetch
    const PAGE_SIZE  = 40;     // max is 40 per page
    let summaries    = [];

    // Loop over pages to collect all summaries
    for (let page = 1; page <= NUM_PAGES; page++) {
      const listUrl = `https://api.rawg.io/api/games?key=${RAWG_KEY}`
                    + `&dates=${dates}`
                    + `&ordering=-added`
                    + `&page=${page}`
                    + `&page_size=${PAGE_SIZE}`;
      const listRes  = await fetch(listUrl);
      const listData = await listRes.json();
      console.log(`Page ${page}: fetched ${listData.results.length} summaries`);
      summaries.push(...listData.results);
    }
    // Deduplicate by RAWG ID in case of overlap
    summaries = summaries.filter((s, i, arr) =>
      arr.findIndex(x => x.id === s.id) === i
    );
    console.log(`Total unique game summaries: ${summaries.length}`);

    // 5) Fetch details & upsert each one
    for (const s of summaries) {
      try {
        const detailUrl = `https://api.rawg.io/api/games/${s.id}?key=${RAWG_KEY}`;
        const detailRes = await fetch(detailUrl);
        if (!detailRes.ok) throw new Error(detailRes.statusText);
        const d = await detailRes.json();

        const gameData = {
          rawgId:       d.id,
          title:        d.name,
          developer:    d.developers?.map(dev => dev.name).join(', ') || 'Unknown',
          platform:     d.platforms?.[0]?.platform?.name || 'Unknown',
          releaseDate:  d.released,
          coverImageUrl:d.background_image || '',
          description:  d.description_raw || '',
          createdBy:    seedUser._id
        };

        await Game.findOneAndUpdate(
          { rawgId: d.id },
          gameData,
          { upsert: true, new: true }
        );
        console.log('Seeded:', gameData.title);
      } catch (err) {
        console.error(`Error seeding ${s.id}:`, err);
      }
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();