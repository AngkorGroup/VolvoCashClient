import { put, take, takeEvery } from 'redux-saga/effects';
import {
  CONFIRM_CHARGE_ERROR,
  CONFIRM_CHARGE_SAGA,
  CONFIRM_CHARGE_SUCCESS,
} from 'utils/redux/actions';
import {
  confirmChargeCall,
  ConfirmChargeSaga,
} from 'utils/redux/services/charge-detail-actions';
import { getChargeListCall } from 'utils/redux/services/charge-list-actions';

function* onConfirmChargeSaga(action: ConfirmChargeSaga) {
  yield put(
    confirmChargeCall(action.payload.chargeId, action.payload.confirmed),
  );
  yield take([CONFIRM_CHARGE_SUCCESS, CONFIRM_CHARGE_ERROR]);
  yield put(getChargeListCall());
}

export default [takeEvery(CONFIRM_CHARGE_SAGA, onConfirmChargeSaga)];
