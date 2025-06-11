import { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/rawgService";
import GameCard from "../GameCard/GameCard";

export default function TrendingGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getTrendingGames()
            .then(data => setGames(data.results || []))
            .catch(console.error);
    }, []);

    return (
        <section>
            <h2>Recent Releases</h2>
            <div className="game-grid">
                {games.map(rawgGame => {
                    const cardGame = {
                        _id: rawgGame.id,
                        title: rawgGame.name,
                        coverImageUrl: rawgGame.background_image || rawgGame.background_image_additional || 'https://via.placeholder.com/200x120?text=No+Image',
                        developer: rawgGame.genres?.[0]?.name || '—',
                        releaseDate: rawgGame.released
                    };
                     console.log('cardGame.coverImageUrl →', cardGame.coverImageUrl);
                    return <GameCard key={rawgGame.id} game={cardGame} />;
                })}
            </div>
        </section>
    );
};