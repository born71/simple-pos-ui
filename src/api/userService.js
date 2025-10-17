import axios from 'axios';

const API_URL = `http://localhost:8080/api/users`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ GET /api/users/{id}
export const getUser = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// ✅ PUT /api/users/{id}
export const updateUser = async (id, userData) => {
  const response = await api.put(`/${id}`, userData);
  return response.data;
};
