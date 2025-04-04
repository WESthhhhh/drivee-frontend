import axios from 'axios';

const token = req.cookies.access_token; 

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${token}` // Auto-add token to all requests
  }
});

export const fetchOffers = async () => {
  try {
    const response = await api.get('/offres');
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};