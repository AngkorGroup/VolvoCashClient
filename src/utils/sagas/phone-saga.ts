import { takeEvery } from 'redux-saga/effects';
import { navigate } from 'utils/navigation';
import { REQUEST_CODE_SUCCESS } from 'utils/redux/actions';
import * as routes from 'utils/routes';

function* onRequestCodeSuccess() {
  navigate(routes.SMS_SCREEN);
}

export default [takeEvery(REQUEST_CODE_SUCCESS, onRequestCodeSuccess)];
