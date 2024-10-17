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

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {

          console.log('Unauthorized access - 401');
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  handleUnauthorized() {
    this.clearToken();
    window.location.href = '/';
  }

  get(path, params = {}) {
    return this.api.get(path, { params });
  }

  post(path, data, isMultipart = false) {
    const headers = {};
    if (isMultipart) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    return this.api.post(path, data, { headers });
  }

  postFormData(path, formData) {
    return this.post(path, formData, true);
  }



  put(path, data, isMultipart = false) {
    const headers = {};
    if (isMultipart) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    return this.api.put(path, data, { headers });

  }

  patch = (path, data) => {
    return this.api.patch(path, data);
  }


  putFormData(path, formData) {
    return this.put(path, formData, true);
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
    return token ? token : null;
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