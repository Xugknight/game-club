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
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Import Game</h3>
      <div className="form-group">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type a game name…"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary auth-submit">
        {loading ? 'Searching…' : 'Search'}
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <ul>
        {results.map(game => (
          <li key={game.id} style={{ margin: '0.5rem 0' }}>
            <strong>{game.name}</strong> ({game.released}){' '}
            {user && (
              <button
                onClick={() => handleImport(game.id)}
                className="btn btn-secondary"
                style={{ marginLeft: '0.5rem' }}
              >
                Add to Library
              </button>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
};