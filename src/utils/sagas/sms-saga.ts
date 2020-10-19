import { takeEvery } from 'redux-saga/effects';
import { navigate } from 'utils/navigation';
import { VERIFY_CODE_SUCCESS } from 'utils/redux/actions';
import * as routes from 'utils/routes';

function* onVerifyCodeSuccess() {
  navigate(routes.APP_TAB);
}

export default [takeEvery(VERIFY_CODE_SUCCESS, onVerifyCodeSuccess)];
