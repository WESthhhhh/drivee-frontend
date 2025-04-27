// services/offersAPI.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

// Fetch all offers
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

// Fetch offer by ID
export const fetchOfferById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/offres/${id}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
};


// Create new offer
export const createOffer = async (offerData) => {
  try {
    console.log('Sending offer data:', offerData); // Debug log
    
    const response = await fetch(`${API_BASE_URL}/offres`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData); // Detailed error log
      throw new Error(errorData.message || `Failed to create offer: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Offer created successfully:', responseData); // Success log
    return responseData;
    
  } catch (error) {
    console.error('Full API Error:', {
      message: error.message,
      stack: error.stack,
      offerData // Include the data that caused the error
    });
    throw error;
  }
};

// Update existing offer
export const updateOffer = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/offres/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update offer');
  }
  return await response.json();
};

// Delete offer
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

// Location-related API functions
export const fetchLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error(`Failed to load locations: ${response.status}`);
  return await response.json();
};

export const fetchCities = async () => {
  const response = await fetch(`${API_BASE_URL}/locations/cities`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.status}`);
  }

  const data = await response.json();
  
  // Format cities consistently (handle both strings and objects)
  return Array.isArray(data) 
    ? data.map(city => typeof city === 'string' ? { value: city, label: city } : city)
    : [];
};


export const createLocation = async (locationData) => {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(locationData)
  });
  if (!response.ok) throw new Error('Failed to create location');
  return await response.json();
};


export const fetchOffersForCurrentSchool = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/offres/my/offers`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await handleResponse(response);
    
    // Basic response validation
    if (!Array.isArray(data)) {
      console.warn('Unexpected response format for school offers:', data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching school offers:', error);
    throw error;
  }
};