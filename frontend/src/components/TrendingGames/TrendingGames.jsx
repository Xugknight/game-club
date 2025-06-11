import { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/rawgService";

export default function TrendingGames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingGames()
        .then(data => setGames(data.results || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    if (loading) 
        return <p>Loading Popular Games...</p>;

    return (
        <div>
            <h2>Trending Now</h2>
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