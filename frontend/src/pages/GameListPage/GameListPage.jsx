import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';
import GameCard from '../../components/GameCard/GameCard';

export default function GameListPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchGames() {
      const gamesData = await gameService.index();
      setGames(gamesData);
    }
    fetchGames();
  }, []);

  const filteredGames = games.filter((game) => (
    game.title.toLowerCase().includes(filter.toLowerCase())
  ));

  return (
    <>
      <h1>All Games</h1>

      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search games…"
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      {filteredGames.length ? (
        <div className="game-grid">
          {filteredGames.map(game =>
            <GameCard key={game._id} game={game} />
          )}
        </div>
      ) : (
        <p>No games {filter ? 'match your search' : 'yet'}.</p>
      )}
    </>
  );
};