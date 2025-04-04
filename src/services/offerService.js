// src/services/offersService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getOffers = async () => {
  try {
    const response = await axios.get(`${API_URL}/offers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export const getOfferById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/offers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching offer:', error);
    throw error;
  }
};