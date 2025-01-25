import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/', // Update with your backend URL
});

// Add a request interceptor to include the token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
