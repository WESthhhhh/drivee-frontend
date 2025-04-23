'use client'
import { useState, useEffect } from 'react';
import { fetchAllOffers, createOffer, updateOffer, deleteOffer } from '../../services/offersAPI';
import OfferForm from './OfferForm'; // You'll need to create this

export default function SchoolOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOffers();
      setOffers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (offerData) => {
    try {
      const newOffer = await createOffer(offerData);
      setOffers(prev => [...prev, newOffer]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updatedOffer = await updateOffer(id, updates);
      setOffers(prev => prev.map(o => o.id === id ? updatedOffer : o));
      setEditingOffer(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOffer(id);
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Manage Your Offers</h1>
      
      {error && <div className="error">{error}</div>}
      
      <OfferForm 
        onSubmit={editingOffer ? 
          (data) => handleUpdate(editingOffer.id, data) : 
          handleCreate
        }
        initialData={editingOffer}
      />
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="offers-list">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <button onClick={() => setEditingOffer(offer)}>Edit</button>
              <button onClick={() => handleDelete(offer.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}