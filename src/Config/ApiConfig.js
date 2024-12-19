import axios from 'axios';

export const API_BASE_URL = 'https://ecommerce-backend-production-d81a.up.railway.app'; // Ensure this is correct

const jwt = localStorage.getItem('jwt')

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL, // Corrected property name here
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
});

export const MY_URL = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
      'Content-Type': 'application/json'
  }
});
