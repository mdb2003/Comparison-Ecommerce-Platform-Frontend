import { createContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    // Check authentication status on mount and fetch user email if authenticated
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const email = localStorage.getItem('userEmail');
        
        if (token) {
            setIsAuthenticated(true);
            
            // If we have a cached email, use it immediately
            if (email) {
                setUserEmail(email);
            }
            
            // Then fetch fresh user data
            fetchUserProfile();
        } else {
            setIsLoadingUser(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await API.get('profile/');
            const email = response.data.email;
            
            setUserEmail(email);
            localStorage.setItem('userEmail', email);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setIsLoadingUser(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userEmail');
        setUserEmail('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            setIsAuthenticated, 
            userEmail,
            setUserEmail,
            isLoadingUser, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
