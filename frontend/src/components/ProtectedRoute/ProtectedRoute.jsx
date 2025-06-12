import { Navigate } from 'react-router';
import { getUser } from '../../services/authService';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
    return getUser() ? children : <Navigate to={redirectTo} replace />;
};