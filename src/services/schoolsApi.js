// services/schoolAPI.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch school profile data
// services/schoolAPI.js
export const fetchSchoolProfile = async (schoolId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${schoolId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch school profile');
      }
      
      const data = await response.json();
      
      return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };
    } catch (error) {
      console.error('Error fetching school profile:', error);
      throw error;
    }
  };

// Fetch school offers
export const fetchSchoolOffers = async (schoolId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/offres/school/${schoolId}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching school offers:', error);
    throw error;
  }
};

// For the current school's own offers (used in school dashboard)
export const fetchCurrentSchoolOffers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/offres/my/offers`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching current school offers:', error);
    throw error;
  }
};