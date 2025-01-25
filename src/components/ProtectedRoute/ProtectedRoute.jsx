import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken'); // Check for JWT token
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
