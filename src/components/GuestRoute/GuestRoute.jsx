import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken'); // Check if the user is already authenticated
    return token ? <Navigate to="/" /> : children;
};

export default GuestRoute;
