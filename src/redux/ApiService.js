// src/api/ApiService.js
import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL, 
      timeout: 10000, 
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(path, params = {}) {
    return this.api.get(path, { params });
  }

  post(path, data) {
    return this.api.post(path, data);
  }

  put(path, data) {
    return this.api.put(path, data);
  }

  delete(path) {
    return this.api.delete(path);
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ?   token: null; 
  }


  clearToken() {
    localStorage.removeItem('token');
    delete this.api.defaults.headers['Authorization'];
  }

  createApiWithoutBaseUrl() {
    const apiWithoutBaseUrl = axios.create({
      timeout: 10000,
    });

    apiWithoutBaseUrl.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return apiWithoutBaseUrl;
  }
}

export default ApiService;
