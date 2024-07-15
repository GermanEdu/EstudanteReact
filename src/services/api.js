import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7069/swagger/index.html', // Altere para a URL da sua API
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
