import axios from 'axios';
import { store } from '../store/store';
import { addToast } from '../store/slices/toastSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// High-Fidelity Request Interceptor: Automated Token Injection
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// High-Fidelity Response Interceptor: Sentinel Error Hub
api.interceptors.response.use(
  (response) => {
    // 🥂 Automated Success Toast for Modifying Requests
    if (['post', 'put', 'delete'].includes(response.config.method || '')) {
      const message = response.data.message || 'Architecture Sync Successful';
      store.dispatch(addToast({ message, type: 'success' }));
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Internal Architecture Sync Collision';
    
    // 🛡️ Global Exception Toasting
    store.dispatch(addToast({ message, type: 'error' }));

    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
