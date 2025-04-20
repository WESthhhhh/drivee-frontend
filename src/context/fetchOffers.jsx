import { createContext, useContext, useState, useEffect } from 'react';

const OffersContext = createContext();

export const OffersDataProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {
        credentials: 'include' 
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (err) {
      console.error('Error fetching user:', err);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      
      const offersRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/offres`);
      if (!offersRes.ok) throw new Error('Failed to fetch offers');
      const offersData = await offersRes.json();

     
      const userIds = [...new Set(offersData.map(offer => offer.schoolId))];
      
      // Try to fetch users if possible (won't fail the whole request if this fails)
      let usersMap = {};
      try {
        const usersData = await Promise.all(
          userIds.map(id => fetchUser(id))
        );
        usersMap = usersData.reduce((acc, user) => {
          if (user) acc[user.id] = user;
          return acc;
        }, {});
      } catch (err) {
        console.log("Couldn't fetch user details, using empty user data");
      }

      setOffers(offersData);
      setUsers(usersMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OffersContext.Provider value={{ offers, users, loading, error, refreshData: fetchData }}>
      {children}
    </OffersContext.Provider>
  );
};

// Add this hook definition and export
export function useOffers() {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('useOffers must be used within an OffersDataProvider');
  }
  return context;
}