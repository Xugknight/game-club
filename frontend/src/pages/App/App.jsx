import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import GameListPage from '../GameListPage/GameListPage';
import GameDetailPage from '../GameDetailPage/GameDetailPage';
import NewGamePage from '../NewGamePage/NewGamePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import AdminPage from '../AdminPage/AdminPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NavBar from '../../components/NavBar/NavBar';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/games"       element={<GameListPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/users/:userId" element={<ProfilePage />} />
          <Route path="/signup"      element={<SignUpPage setUser={setUser} />} />
          <Route path="/login"       element={<LogInPage setUser={setUser} />} />

          <Route
            path="/games/new"
            element={
              <ProtectedRoute>
                <NewGamePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute redirectTo="/">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={null} />
        </Routes>
      </section>
    </main>
  );
}

