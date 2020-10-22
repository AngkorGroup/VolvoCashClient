import { Card } from 'models/Card';
import { theme } from 'utils/styles';

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
  }),
  new Card({
    id: 2,
    cardType: {
      id: 1,
      name: 'Volvo Cash',
      displayName: 'Volvo Cash',
      color: theme.accent.color,
    },
    balance: 2621.32,
    currency: 'PEN',
    ownerType: 'primary',
  }),
  new Card({
    id: 3,
    cardType: {
      id: 1,
      name: 'Volvo Cash',
      displayName: 'Volvo Cash',
      color: theme.accent.color,
    },
    balance: 2621.32,
    ownerName: 'José González',
    currency: 'PEN',
    ownerType: 'secondary',
  }),
  new Card({
    id: 4,
    cardType: {
      id: 1,
      name: 'Bono Urea',
      displayName: 'Bono Urea',
      color: theme.secondary.color,
    },
    balance: 7200.0,
    ownerName: 'José González',
    currency: 'PEN',
    ownerType: 'secondary',
  }),
];
