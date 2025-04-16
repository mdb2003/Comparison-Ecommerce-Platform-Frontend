import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 30000, // 30 second timeout
});

// Add request interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log("This is token: ", token);
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor for token refresh
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await API.post('token/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', response.data.access);
                
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return API(originalRequest);
            } catch (err) {
                // Refresh token failed, redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default API;
