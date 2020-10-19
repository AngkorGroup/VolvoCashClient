import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

moment.updateLocale('es', {
  monthsShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'set',
    'oct',
    'nov',
    'dic',
  ],
});

export const formatDate = (date: string | Date) =>
  moment(date).format('D MMM YYYY, hh:mm a');
