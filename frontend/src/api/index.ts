import axios from 'axios';
import authStore from '~/stores/AuthStore';

const HOST_BASE_URL = 'http://localhost:5555';
const API_BASE_URL = `/api/v1`;

export const API = axios.create({
  baseURL: `${HOST_BASE_URL}${API_BASE_URL}`,
  withCredentials: true
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authStore.setAuthenticated(false);
    }
    return Promise.reject(error);
  }
);
