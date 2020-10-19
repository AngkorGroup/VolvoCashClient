import { all, takeEvery } from 'redux-saga/effects';
import { LOG_REDUX_ACTIONS } from 'utils/constants';
import phoneSaga from './phone-saga';
import authSaga from './request-saga';
import smsSaga from './sms-saga';
import cardListSaga from './card-list-saga';

function* logger(action: any) {
  if (__DEV__ && LOG_REDUX_ACTIONS) {
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
    takeEvery('*', logger),
  ]);
}
