import { takeEvery } from 'redux-saga/effects';
import { REQUEST_CODE_SUCCESS } from 'utils/redux/actions';
import { navigate } from 'utils/navigation';
import * as routes from 'utils/routes';
import { RequestCodeSuccess } from 'utils/redux/ui/phone-screen/phone-screen-actions';

function* onRequestCodeSuccess(action: RequestCodeSuccess) {
  navigate(routes.SMS_SCREEN, { smsCode: action.payload?.smsCode.toString() });
}

export default [takeEvery(REQUEST_CODE_SUCCESS, onRequestCodeSuccess)];
