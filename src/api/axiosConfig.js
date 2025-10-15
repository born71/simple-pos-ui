import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      Swal.fire({
        icon: 'warning',
        title: 'Session expired',
        text: 'Please log in again.',
        confirmButtonColor: '#000',
      }).then(() => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);

export default api;
