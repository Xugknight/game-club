import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';

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
        <ul>
          {games.map((game) => <li key={game._id}>{game.title}</li>)}
        </ul>
        :
        <p>No Games Yet!</p>
      }
    </>
  );
}