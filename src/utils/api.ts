import { create } from 'apisauce';
import { API_URL } from '@env';

console.log('API_URL: ', API_URL);

export const developmentApi = create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export type apiMethod = 'get' | 'post' | 'patch' | 'delete';

export const apiNames = {
  development: 'development',
};

export default {
  [apiNames.development]: developmentApi,
};
