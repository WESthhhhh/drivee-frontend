import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import api from '../utils/axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  
  const lastRequestTime = useRef(0);

  const checkAuth = useCallback(async () => {
    
    const now = Date.now();
    if (now - lastRequestTime.current < 5000) return;
    lastRequestTime.current = now;

    setIsLoading(true);
    try {
      await api.get('/users/me');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      if (error.response?.status === 401 && !location.pathname.startsWith('/login')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, isLoading, checkAuth };
}