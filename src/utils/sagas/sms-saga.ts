import { select, takeEvery } from 'redux-saga/effects';
import { developmentApi } from 'utils/api';
import { navigate } from 'utils/navigation';
import { VERIFY_CODE_SUCCESS } from 'utils/redux/actions';
import { selectAuthToken } from 'utils/redux/auth/auth-reducer';
import * as routes from 'utils/routes';

function* onVerifyCodeSuccess() {
  navigate(routes.APP_TAB);
  const token = yield select(selectAuthToken);
  developmentApi.setHeader('Authorization', `Bearer ${token}`);
}

export default [takeEvery(VERIFY_CODE_SUCCESS, onVerifyCodeSuccess)];
