import { useState } from 'react';
import { searchRawgGames } from '../../services/rawgService';

export default function RawgSearch() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

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

  return (
    <div>
      <h2>Search RAWG Games</h2>
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
        {results.map(game => (
          <li key={game.id}>
            <strong>{game.name}</strong> ({game.released})
          </li>
        ))}
      </ul>
    </div>
  );
}
