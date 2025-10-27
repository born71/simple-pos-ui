import axios from 'axios';

const API_URL = `http://localhost:8080/api/analytics`;

// ✅ สรุปรายได้และจำนวนยอดขายทั้งหมด
// export const getSalesSummary = () => api.get('/api/analytics/summary');
export const getSalesSummary = () => axios.get(`${API_URL}/summary`);

// ✅ ข้อมูลสินค้าขายดี
// export const getTopProducts = () => api.get('/api/analytics/top-products');
export const getTopProducts = () => axios.get(`${API_URL}/top-products`);

// ✅ ยอดขายรายวัน
// export const getDailySales = () => api.get('/api/analytics/daily');
export const getDailySales = () => axios.get(`${API_URL}/daily`);