/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate('/games');
    } catch (err) {
      setErrorMsg('Sign Up Failed - Try Again');
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <h2>Sign Up!</h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <div className='form-group'>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={disable}
          className='btn btn-primary auth-submit'
        >
          Sign Up
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
};