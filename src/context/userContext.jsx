// contexts/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch user data
        const { data: user } = await api.get('/users/me', { withCredentials: true });
        setUserData(user);
  
        // 2. Only check verification if user is a SCHOOL
        if (user.role === 'SCHOOL') {
          try {
            const { data: verification } = await api.get('/verifications/status', { 
              withCredentials: true 
            });
            setVerificationStatus(verification);
          } catch (error) {
            if (error.response?.status === 404) {
              setVerificationStatus(null);
            } else {
              console.error('Verification check error:', error);
            }
          }
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (load){
        fetchData();
    }
    
  }, []);

  const value = {
    userData,
    verificationStatus,
    loading,
    error,
    isSchoolVerified: () => {
      if (userData?.role !== 'SCHOOL') return true;
      if (!verificationStatus) return false;
      return verificationStatus.status === 'APPROVED';
    }
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}