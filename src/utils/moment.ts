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

export const getCurrentDate = () => moment().format('DD/MM/YYYY');

export const getCurrentHour = () => moment().format('hh:mm a');

export const formatDate = (date: string | Date) =>
  moment(date).format('D MMM YYYY, hh:mm a');

export const customFormatDate = (date: string | Date) =>
  moment(date, 'D MMM YYYY, hh:mm a').format('DD/MM/YYYY');

export const customFormatHour = (date: string | Date) =>
  moment(date, 'D MMM YYYY, hh:mm a').format('hh:mm a');
