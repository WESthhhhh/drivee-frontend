import React, { useEffect, useState } from 'react';
import { fetchAllOffers } from './services/offersApi';
import OfferCard from './components/cards/offerCards';
import Spinner from '../UI/Spinner';

const OfferList = ({ filters }) => {  // Accept filters (e.g., { city: 'Agadir' })
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await fetchAllOffers();
        setOffers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, [filters]);  

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (offers.length === 0) return <div>No offers found.</div>;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsPerRow} gap-6 p-4`}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export default OfferList;