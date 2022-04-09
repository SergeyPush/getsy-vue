import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PATH?.toString(),
});

export default api;
