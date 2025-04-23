import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL || 
  process.env?.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
  
});

let lastRequestTime = 0;
const minRequestInterval = 500; // 500ms between requests

api.interceptors.request.use(async (config) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < minRequestInterval) {
    await new Promise(resolve => 
      setTimeout(resolve, minRequestInterval - timeSinceLastRequest)
    );
  }
  
  lastRequestTime = Date.now();
  return config;
});

export default api;