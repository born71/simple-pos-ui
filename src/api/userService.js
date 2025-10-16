import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};
