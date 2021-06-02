import axios, { AxiosRequestConfig } from 'axios';

const handleAddAuthorization = (request: AxiosRequestConfig): AxiosRequestConfig => {
  if (!request.headers['Authorization']) {
    request.headers['Authorization'] = `Bearer ${process.env.REACT_APP_KEY}`;
  }
  return request;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(handleAddAuthorization);

export default instance;
