import { Charge } from 'models/Charge';

export default new Charge({
  id: 1,
  amount: 1200.2,
  currency: 'PEN',
  date: '1985-06-12T23:20:50.52Z',
  displayName: 'Lubricante HD-5000',
  cashier: {
    firstName: 'Luis',
    lastName: 'Ramos',
  },
});
