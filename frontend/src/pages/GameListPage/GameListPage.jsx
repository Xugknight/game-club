import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';
import GameCard from '../../components/GameCard/GameCard';

export default function GameListPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const gamesData = await gameService.index();
      setGames(gamesData);
    }
    fetchGames();
  }, []);

  return (
    <>
      <h1>Game List</h1>
      {games.length ? 
        <div className='game-grid'>
            {games.map((game) => 
              <GameCard key={game._id} game={game} />
            )}
        </div>
        :
        <p>No Games Yet!</p>
      }
    </>
  );
}