import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';

const handleDelay = async (response: AxiosResponse): Promise<AxiosResponse> => {
  await new Promise((resolve) => _.delay(resolve, 1250));

  return response;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_KEY}`
  }
});

instance.interceptors.response.use(handleDelay);

export default instance;
