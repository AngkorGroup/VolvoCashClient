import { create } from 'apisauce';

export const developmentApi = create({
  baseURL: 'https://dev-volvocash.angkor-apps.com//api',
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
