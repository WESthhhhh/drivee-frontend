import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
     
      await api.get('/users/me'); 
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    
      if (!location.pathname.startsWith('/login')) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
          replace: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]); 

  return { isAuthenticated, isLoading, checkAuth };
}