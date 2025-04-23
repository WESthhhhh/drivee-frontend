import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      await api.get('/users/me');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      if (error.response?.status === 401) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, checkAuth };
}