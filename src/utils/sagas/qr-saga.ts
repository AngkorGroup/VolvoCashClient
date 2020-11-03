import { put, takeEvery } from 'redux-saga/effects';
import { navigate } from 'utils/navigation';
import {
  GetChargeDetailSuccess,
  setChargeId,
} from 'utils/redux/services/charge-detail-actions';
import * as routes from 'utils/routes';

function* onMockChargeSuccess(action: GetChargeDetailSuccess) {
  yield put(setChargeId(action.payload.id));
  navigate(routes.CONFIRMATION_MODAL);
}

export default [takeEvery('MOCK_CHARGE_SUCCESS', onMockChargeSuccess)];
