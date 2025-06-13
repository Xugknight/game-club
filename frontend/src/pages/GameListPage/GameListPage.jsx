import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';
import GameCard from '../../components/GameCard/GameCard';

export default function GameListPage() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPage(1);
  }, []);

  async function loadPage(nextPage) {
    setLoading(true);
    try {
      const { games: newGames, totalPages: tp } = await gameService.index(nextPage);
      setGames((prev) =>
        nextPage === 1 ? newGames : [...prev, ...newGames]
    );
    setPage(nextPage);
    setTotalPages(tp);
    } catch (err) {
      console.log('Failed to Load Games', err);
    }
  }

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