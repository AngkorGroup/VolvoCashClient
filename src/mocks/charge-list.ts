import { Charge } from 'models/Charge';

export default [
  new Charge({
    id: 1,
    status: 'Pending',
    chargeType: 'Remote',
    amount: {
      value: 1200.2,
      currency: 'PEN',
    },
    createdAt: '2020-06-12T23:20:50.52Z',
    displayName: 'Lubricante HD-5000',
    cashier: {
      firstName: 'Luis',
      lastName: 'Ramos',
    },
  }),
  new Charge({
    id: 2,
    status: 'Pending',
    chargeType: 'Remote',
    amount: {
      value: 2222.2,
      currency: 'PEN',
    },
    createdAt: '2000-06-12T23:20:50.52Z',
    displayName: 'Llantas',
    cashier: {
      firstName: 'Jorge',
      lastName: 'Ramirez',
    },
  }),
  new Charge({
    id: 3,
    status: 'Pending',
    chargeType: 'Remote',
    amount: {
      value: 123.2,
      currency: 'PEN',
    },
    createdAt: '1985-09-12T23:20:50.52Z',
    displayName: 'Lubricante HD-3000',
    cashier: {
      firstName: 'Johnny',
      lastName: 'Bravo',
    },
  }),
];
