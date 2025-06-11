import { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/rawgService";

export default function TrendingGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getTrendingGames()
        .then(data => setGames(data.results || []))
        .catch(console.error);
    }, []);

    return (
        <div>
            <h2>Recent Releases</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <strong>{game.name}</strong> ({game.released})
                    </li>
                ))}
            </ul>
        </div>
    );
};