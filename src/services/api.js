import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

console.log('API URL:', API_URL); // Debug log

// Function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url); // Debug log
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Clear invalid token
      window.location.href = '/login'; // Redirect to login
    }
    
    throw error.response?.data || error;
  }
);

// Auth APIs
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Pet APIs
export const getAllPets = async (type = 'all') => {
  try {
    const response = await api.get(`/pets?type=${type}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPet = async (id) => {
  try {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createPet = async (petData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePet = async (id, petData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePet = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deletePet:', error.response || error);
    throw error.response?.data || error.message;
  }
};

export default api;
