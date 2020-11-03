import { all, takeEvery } from 'redux-saga/effects';
import { LOG_REDUX_ACTIONS } from '@env';
import phoneSaga from './phone-saga';
import authSaga from './request-saga';
import smsSaga from './sms-saga';
import cardListSaga from './card-list-saga';
import chargeListSaga from './charge-list-saga';
import confirmationModalSaga from './confirmation-modal-saga';
import qrSaga from './qr-saga';

function* logger(action: any) {
  if (LOG_REDUX_ACTIONS === 'true' && __DEV__) {
    console.log('-----');
    console.log('type:   ', action.type);
    console.log('payload:', action?.payload);
    console.log('meta:   ', action?.meta);
    console.log('-----');
  }
}

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...phoneSaga,
    ...smsSaga,
    ...cardListSaga,
    ...chargeListSaga,
    ...confirmationModalSaga,
    ...qrSaga,
    takeEvery('*', logger),
  ]);
}
