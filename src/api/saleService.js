import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/sales';

// ✅ Helper: get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Create sale (requires login)
export const createSale = async (saleData) => {
  return axios.post(BASE_URL, saleData, { headers: getAuthHeader() });
};

// ✅ Get all sales (also secured)
export const getAllSales = async () => {
  return axios.get(BASE_URL, { headers: getAuthHeader() });
};
