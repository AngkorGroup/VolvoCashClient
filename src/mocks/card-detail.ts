import { Batch } from 'models/Batch';
import { Card } from 'models/Card';
import { Movement } from 'models/Movement';
import { theme } from 'utils/styles';
import batchList from './batch-list';
import movementList from './movement-list';

export default [
  new Card({
    id: 1,
    cardType: {
      id: 1,
      name: 'Bono Urea',
      displayName: 'Bono Urea',
      color: theme.secondary.color,
    },
    balance: 7200.0,
    currency: 'PEN',
    ownerType: 'primary',
    movements: [
      new Movement({
        id: 1,
        displayName: 'Recarga2',
        description: 'Recarga de algo',
        amount: 10000.23,
        type: 'in',
        date: '1985-06-12T23:20:50.52Z',
        currency: 'PEN',
      }),
      new Movement({
        id: 2,
        displayName: 'Lubricante HD-5001',
        description: 'Recarga de algo',
        amount: 1234.22,
        type: 'out',
        date: '1985-05-12T23:20:50.52Z',
        currency: 'PEN',
      }),
      new Movement({
        id: 3,
        displayName: 'Recarga2',
        description: 'Recarga de algo',
        amount: 10000.23,
        type: 'in',
        date: '1985-04-12T23:20:50.52Z',
        currency: 'PEN',
      }),
    ],
    batches: [
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
    ],
  }),
  new Card({
    id: 1,
    cardType: {
      id: 1,
      name: 'Bono Urea',
      displayName: 'Bono Urea',
      color: theme.secondary.color,
    },
    balance: 7200.0,
    currency: 'PEN',
    ownerType: 'primary',
    movements: movementList,
    batches: batchList,
  }),
];
