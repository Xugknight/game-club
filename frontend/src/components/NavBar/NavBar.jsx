import { NavLink, Link } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    logOut();
    setUser(null);
  };

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/games" end>
            Games
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/games/new">Add Game</NavLink>
          {user.isAdmin && (
            <>
              &nbsp;|&nbsp;
              <NavLink to="/admin">Admin</NavLink>
            </>
          )}
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
          <span>Welcome, {user.username}</span>
        </>
      ) : (
        <>
          <NavLink to="/games" end>
            Games
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};