import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // Ensure the URL ends with /api since all backend routes use this prefix
    return envUrl.endsWith('/api') ? envUrl : envUrl.replace(/\/$/, '') + '/api';
  }
  return import.meta.env.PROD 
    ? 'https://codevaultcsm.onrender.com/api' 
    : 'http://localhost:5001/api';
};

const API_BASE_URL = getBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('codevault_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('codevault_token');
    }
    return Promise.reject(error);
  }
);
