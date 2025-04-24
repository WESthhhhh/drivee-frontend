'use client'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import api from '../utils/axios';
import { useState, useEffect } from 'react';
// import { fetchAllOffers, createOffer, updateOffer, deleteOffer } from '../services/offersAPI';


// services/offersAPI.js
export const fetchSchoolOffers = async (schoolId) => {
  console.log("Attempting to fetch offers for school:", schoolId);
  const response = await fetch(`${API_BASE_URL}/offres/${schoolId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' // if using cookies
  });
  
  console.log("Response status:", response.status);
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    throw new Error(errorData.message || 'Failed to fetch school offres');
  }
  
  const data = await response.json();
  console.log("Response data:", data);
  return data;
};

export const fetchAllOffers = async () => {
  const response = await fetch(`${API_BASE_URL}/offres`);
  if (!response.ok) throw new Error('Failed to fetch offers');
  return await response.json();
};

export const createOffer = async (offerData) => {
  const response = await fetch(`${API_BASE_URL}/offres`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offerData)
  });
  if (!response.ok) throw new Error('Failed to create offer');
  return await response.json();
};

export const updateOffer = async (id, offerData) => {
  const response = await fetch(`${API_BASE_URL}/offres/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offerData)
  });
  if (!response.ok) throw new Error('Failed to update offer');
  return await response.json();
};

export const deleteOffer = async (id) => {
  const response = await fetch(`${API_BASE_URL}offres/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete offer');
  return await response.json();
};