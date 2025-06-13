import { useState } from 'react';
import { searchRawgGames } from '../../services/rawgService';
import { importFromRawg } from '../../services/gameService';
import { useNavigate } from 'react-router';

export default function RawgSearch() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await searchRawgGames(query);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleImport(rawgId) {
    try {
      const newGame = await importFromRawg(rawgId);
      navigate(`/games/${newGame._id}`);
    } catch (err) {
      console.log('Import Failed', err)
    }
  };

  return (
    <div>
      <h2>Search Games</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
          placeholder="Type a game name…"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((game) => (
          <li key={game.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{game.name}</strong> ({game.released}){' '}
            <button onClick={() => handleImport(game.id)}>
              Add to Library
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}