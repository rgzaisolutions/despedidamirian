import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// Add headers for group authentication from localStorage
api.interceptors.request.use((config) => {
    const groupId = localStorage.getItem('groupId');
    const groupPin = localStorage.getItem('groupPin');

    if (groupId) config.headers['x-group-id'] = groupId;
    if (groupPin) config.headers['x-group-pin'] = groupPin;

    return config;
});

export default api;
