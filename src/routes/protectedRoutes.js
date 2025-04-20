// components/RequireAuth.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !location.pathname.startsWith('/login')) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true
      });
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen via useEffect
  }

  return children;
}