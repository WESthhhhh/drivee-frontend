'use client'
import { useState, useEffect } from 'react';
import { fetchSchoolOffers, createOffer, updateOffer, deleteOffer } from '../../services/schoolOffersApi';
import OfferForm from '../modals/addOffer';

import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import LoadingSpinner from '../UI/loadingSpinner';

export default function SchoolOffers({ schoolId }) {
  console.log("Component rendering with schoolId:", schoolId);
  
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered with schoolId:", schoolId);
    if (schoolId) {
      console.log("schoolId is valid, loading offers");
      loadOffers();
    } else {
      console.warn("No schoolId provided");
      setLoading(false);
    }
  }, [schoolId]);

  const loadOffers = async () => {
    console.log("Starting loadOffers");
    try {
      setLoading(true);
      setError(null);
      console.log("Calling fetchSchoolOffers with schoolId:", schoolId);
      
      const data = await fetchSchoolOffers(schoolId);
      console.log("Received data:", data);
      
      setOffers(data);
    } catch (err) {
      console.error("Error in loadOffers:", err);
      setError(err.message);
    } finally {
      console.log("Finished loading");
      setLoading(false);
    }
  };

  const handleCreate = async (offerData) => {
    try {
      const newOffer = await createOffer({ ...offerData, schoolId });
      setOffers(prev => [...prev, newOffer]);
      setShowForm(false);
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
    if (confirm('Are you sure you want to delete this offer?')) {
      try {
        await deleteOffer(id);
        setOffers(prev => prev.filter(o => o.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0F34AE]">School Offers</h1>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingOffer(null);
            setShowForm(true);
          }}
        >
          Add New Offer
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {(showForm || editingOffer) && (
        <OfferForm 
          onSubmit={editingOffer ? 
            (data) => handleUpdate(editingOffer.id, data) : 
            handleCreate
          }
          initialData={editingOffer}
          onCancel={() => {
            setEditingOffer(null);
            setShowForm(false);
          }}
        />
      )}

      {offers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No offers found for this school
        </div>
      ) : (
        <div className="space-y-4">
          {offers.map(offer => (
            <div key={offer.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="text-gray-600">{offer.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div><span className="font-semibold">Price:</span> ${offer.price}</div>
                    <div><span className="font-semibold">Duration:</span> {offer.durationHours} hours</div>
                    <div><span className="font-semibold">Start:</span> {new Date(offer.startDate).toLocaleDateString()}</div>
                    <div><span className="font-semibold">End:</span> {new Date(offer.endDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setEditingOffer(offer)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Edit"
                  >
                    <Pencil />
                  </button>
                  <button 
                    onClick={() => handleDelete(offer.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}