import axios, { Axios } from 'axios';
import { APIResponse } from '../@types';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const instance = {
  get: <T>(...args: Parameters<Axios['get']>): Promise<APIResponse<T>> => baseInstance.get(...args),
  delete: <T>(...args: Parameters<Axios['delete']>): Promise<APIResponse<T>> =>
    baseInstance.delete(...args),
  post: <T>(...args: Parameters<Axios['post']>): Promise<APIResponse<T>> =>
    baseInstance.post(...args),
};

export default instance;
