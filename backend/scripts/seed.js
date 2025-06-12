require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/game');
const User = require('../models/user');

const RAWG_KEY = process.env.RAWG_API_KEY;
const MONGO_URI = process.env.MONGODB_URI;

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        let seedUser = await User.findOne({ email: 'seed@localhost' });
        if (!seedUser) {
            seedUser = await User.create({
                username: 'seeduser',
                email: 'seed@localhost',
                password: 'password123'
            });
            console.log('Created seed user:', seedUser._id);
        }

        const today = new Date();
        const daysToPull = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        const dates = `${formatDate(daysToPull)},${formatDate(today)}`;
        const listUrl = `https://api.rawg.io/api/games?key=${RAWG_KEY}` + `&dates=${dates}&ordering=-added&page_size=40`;
        const listRes = await fetch(listUrl);
        const listData = await listRes.json();
        const summaries = listData.results;
        console.log(`Fetched ${summaries.length} game summaries`);

        for (const s of summaries) {
            const detailUrl = `https://api.rawg.io/api/games/${s.id}?key=${RAWG_KEY}`;
            const detailRes = await fetch(detailUrl);
            if (!detailRes.ok) {
                console.error(`Failed to fetch details for ${s.id}`, detailRes.statusText);
                continue;
            }
            const d = await detailRes.json();

            const gameData = {
                title: d.name,
                developer: d.developers?.map(dev => dev.name).join(', ') || 'Unknown',
                platform: d.platforms?.[0]?.platform?.name || 'Unknown',
                releaseDate: d.released,
                coverImageUrl: d.background_image || '',
                description: d.description_raw || '',
                createdBy: seedUser._id
            };

            await Game.findOneAndUpdate(
                { title: gameData.title, releaseDate: gameData.releaseDate },
                gameData,
                { upsert: true, new: true }
            );
            console.log('Seeded:', gameData.title);
        }

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.disconnect();
    }
}

seed();