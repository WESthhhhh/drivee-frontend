import { createContext, useContext, useState, useEffect } from 'react';

const OffersContext = createContext();

export const OffersDataProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const offersRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/offres`);
      if (!offersRes.ok) throw new Error('Failed to fetch offers');
      const offersData = await offersRes.json();

      setOffers(offersData);
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
    <OffersContext.Provider value={{ offers, loading, error, refreshData: fetchData }}>
      {children}
    </OffersContext.Provider>
  );
};

export function useOffers() {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('useOffers must be used within an OffersDataProvider');
  }
  return context;
}