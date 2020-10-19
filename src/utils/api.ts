import { create } from 'apisauce';

const localApi = create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export type apiMethod = 'get' | 'post' | 'patch' | 'delete';

export const apiNames = {
  localhost: 'localhost',
};

export default {
  [apiNames.localhost]: localApi,
};
