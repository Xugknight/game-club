import { useState } from 'react';
import { searchRawgGames } from '../../services/rawgService';
import { importFromRawg } from '../../services/gameService';
import { getUser } from '../../services/authService';
import { useNavigate } from 'react-router';

export default function RawgSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = getUser();

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
      console.error('Import Failed', err)
    }
  };

  return (
    <div>
      <h3>Import Game</h3>
        <form onSubmit={handleSubmit} className='form-group'style={{ maxWidth: 400, margin: '0 auto 1rem' }}>
          <input
            type="text"
            className='search-input'
            value={query}
            onChange={(evt) => setQuery(evt.target.value)}
            placeholder="Type a game name…"
            required
          />
          <button
            type="submit"
            disabled={loading}
            class='btn btn-primary'
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>

      {error && <p style={{ color: 'var(--color-danger)', textAlign: 'center' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0, maxWidth: 400, margin: '0 auto' }}>
        {results.map((game) => (
          <li key={game.id} style={{ marginBottom: '1rem' }}>
            <strong>{game.name}</strong> ({game.released}){' '}
            {user && (
              <button
                onClick={() => handleImport(game.id)}
                class='btn btn-primary'
                style={{ marginLeft: '0.5rem' }}
              >
                Add to Library
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};