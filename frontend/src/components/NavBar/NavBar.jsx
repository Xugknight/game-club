import { Link } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    logOut();
    setUser(null);
  };

  return (
    <nav className="NavBar">
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/games">Games</Link>
          &nbsp; | &nbsp;
          <Link to="/games/new">Add Game</Link>
          &nbsp; | &nbsp;
          <Link to={`/users/${user._id}`}>My Profile</Link>
          {user.isAdmin && (
            <>
              &nbsp;|&nbsp;
              <Link to="/admin">Admin</Link>
            </>
          )}
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
          <span>Welcome, {user.username}</span>
        </>
      ) : (
        <>
          <Link to="/games">Games</Link>
          &nbsp; | &nbsp;
          <Link to="/login">Log In</Link>
          &nbsp; | &nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};