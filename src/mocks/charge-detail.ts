import { Charge } from 'models/Charge';

export default new Charge({
  id: 1,
  amount: 1200.2,
  currency: 'PEN',
  displayName: 'Lubricante HD-5000',
  cashier: {
    firstName: 'Luis',
    lastName: 'Ramos',
  },
});
