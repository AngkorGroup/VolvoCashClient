import { Batch } from 'models/Batch';

export default [
  new Batch({
    id: 1,
    balance: 1000.23,
    expiresAt: '2020-12-12T23:20:50.52Z',
    currency: 'PEN',
  }),
  new Batch({
    id: 2,
    balance: 99.23,
    expiresAt: '1990-06-09T23:20:50.52Z',
    currency: 'PEN',
  }),
  new Batch({
    id: 3,
    balance: 10200.23,
    expiresAt: '1990-07-12T23:20:50.52Z',
    currency: 'PEN',
  }),
  new Batch({
    id: 4,
    balance: 222.23,
    expiresAt: '1990-08-11T23:20:50.52Z',
    currency: 'PEN',
  }),
];
