import { Charge } from 'models/Charge';

export default new Charge({
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
});
