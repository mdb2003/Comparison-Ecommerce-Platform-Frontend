import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('This is token: ', token);
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Check if error or error.response is undefined (connection errors)
        if (!error || !error.response) {
            console.error('Network error occurred (server might be down):', error.message);
            return Promise.reject({
                message: 'Unable to connect to server. Please check if the backend server is running.'
            });
        }

        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return API(originalRequest);
            } catch (refreshError) {
                // If refresh token is invalid, clear storage and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API; 