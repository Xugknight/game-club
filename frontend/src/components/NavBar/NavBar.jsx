import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function onClickOutside(evt) {
      if (menuRef.current && !menuRef.current.contains(evt.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleLogOut() {
    logOut();
    setUser(null);
    setOpen(false);
  };

  return (
     <nav className="NavBar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        {user && <Link to="/games/new">Add Game</Link>}
      </div>

      <div className="nav-right" ref={menuRef}>
        <button
          aria-haspopup="true"
          aria-expanded={open}
          className="user-button"
          onClick={() => setOpen(o => !o)}
        >
          <FiUser /> {user ? user.username : 'Guest'} <FiChevronDown />
        </button>
        {open && (
          <ul className="dropdown-menu">
            {user ? (
              <>
                <li><Link to={`/users/${user._id}`} onClick={() => setOpen(false)}>My Profile</Link></li>
                {user.isAdmin && (
                  <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
                )}
                <li><button onClick={handleLogOut}>Log Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setOpen(false)}>Log In</Link></li>
                <li><Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link></li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};