import { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/rawgService";
import GameCard from "../GameCard/GameCard";

export default function TrendingGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchTrending() {
            try {
                const data = await getTrendingGames();
                setGames(data.results || []);
            } catch (err) {
                console.log('Error loading trending games:', err);
            }
        }
        fetchTrending();
    }, []);

    return (
        <section>
            <h2>Recent Releases</h2>
            <div className="game-grid">
                {games.map(rawgGame => {
                    const cardGame = {
                        _id: rawgGame.id,
                        title: rawgGame.name,
                        coverImageUrl: rawgGame.background_image,
                        developer: rawgGame.genres?.[0]?.name || '—',
                        releaseDate: rawgGame.released
                    };

                    return <GameCard key={rawgGame.id} game={cardGame} />;
                })}
            </div>
        </section>
    );
};