import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setCredentials, logout, setLoading, setError } from '../store/slices/authSlice';
import api from '../services/api';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const login = async (credentials: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await api.post('/auth/login', credentials);
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Authentication Collision detected';
      dispatch(setError(message));
      throw new Error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const performLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout: performLogout,
  };
};
