/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiLogIn } from 'react-icons/fi';
import * as authService from '../../services/authService';

export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate('/games');
    } catch (err) {
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <div class='form-group'>
          <h2>Log In</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary auth-submit">
          <FiLogIn
            style={{ marginRight: '0.5rem' }}
          />
          Log In
        </button>
      </form >
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
};