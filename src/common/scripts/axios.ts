import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';

const handleAddAuthorization = (request: AxiosRequestConfig): AxiosRequestConfig => {
  if (request && request.headers && request.headers['Authorization']) {
    request.headers['Authorization'] = `Bearer ${process.env.REACT_APP_KEY}`;
  }
  return request;
};

const handleDelay = async (response: AxiosResponse): Promise<AxiosResponse> => {
  await new Promise((resolve) => _.delay(resolve, 1250));

  return response;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(handleAddAuthorization);
instance.interceptors.response.use(handleDelay);

export default instance;
