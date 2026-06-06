import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

// Add a request interceptor to attach JWT if we had one
// For now, Supabase manages its own session, but we can pass it if needed.

export default api;
