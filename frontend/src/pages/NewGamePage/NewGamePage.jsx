import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as gameService from '../../services/gameService';
import RawgSearch from '../../components/RawgSearch/RawgSearch';

export default function NewGamePage() {
  const [formData, setFormData] = useState({
    title: '',
    developer: '',
    platform: '',
    releaseDate: '',
    coverImageUrl: '',
    description: '',
  });
  const [useManual, setUseManual] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newGame = await gameService.createGame(formData);
      navigate(`/games/${newGame._id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Adding Game Failed');
    }
  }

  return (
    <>
      <h1>Add New Game</h1>

      {!useManual && (
        <>
          <RawgSearch />
          <button
            onClick={() => setUseManual(true)}
            className='btn btn-primary'
            style={{ display:'block', margin: '1rem auto' }}
          >
            Add Manually
          </button>
        </>
      )}
      {useManual && (
        <>
          <button
            onClick={() => setUseManual(false)}
            className='btn btn-secondary'
            style={{ display:'block', margin: '1rem auto' }}
          >
            Back to Import
          </button>
            <form onSubmit={handleSubmit} className='auth-form'>
              <label>Title</label>
              <input
                type="text"
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label>Developer</label>
              <input
                type="text"
                name='developer'
                value={formData.developer}
                onChange={handleChange}
                required
              />
              <label>Platform</label>
              <input
                type="text"
                name='platform'
                value={formData.platform}
                onChange={handleChange}
                required
              />
              <label>Release Date</label>
              <input
                type="date"
                name='releaseDate'
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
              <label>Cover Image URL</label>
              <input
                type="text"
                name='coverImageUrl'
                value={formData.coverImageUrl}
                onChange={handleChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <button
                type="submit"
                className='btn btn-primary'
              >
                Add Game</button>
            </form>
        </>
      )}
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
};