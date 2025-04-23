// services/offersAPI.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllOffers = async () => {
  const response = await fetch(`${API_BASE_URL}/offres`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error(`Failed to load offers: ${response.status}`);
  return await response.json();
};

export const createOffer = async (offerData) => {
  const response = await fetch(`${API_BASE_URL}/offres`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(offerData)
  });
  if (!response.ok) throw new Error('Failed to create offer');
  return await response.json();
};

export const updateOffer = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/offres/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update offer');
  return await response.json();
};

export const deleteOffer = async (id) => {
    const response = await fetch(`${API_BASE_URL}/offres/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete offer');
    }
    return await response.json();
  };