import { Alert } from 'react-native';
import { put, take, takeEvery } from 'redux-saga/effects';
import { goBack, navigate } from 'utils/navigation';
import {
  CONFIRM_CHARGE_ERROR,
  CONFIRM_CHARGE_SAGA,
  CONFIRM_CHARGE_SUCCESS,
} from 'utils/redux/actions';
import {
  confirmChargeCall,
  ConfirmChargeSaga,
  ConfirmChargeSuccess,
  setChargeId,
} from 'utils/redux/services/charge-detail-actions';
import { getChargeListCall } from 'utils/redux/services/charge-list-actions';
import { getCardListCall } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import * as routes from 'utils/routes';

function* onConfirmChargeSaga(action: ConfirmChargeSaga) {
  yield put(setChargeId(action.payload.chargeId));
  yield put(
    confirmChargeCall(action.payload.chargeId, action.payload.confirmed),
  );
  yield take([CONFIRM_CHARGE_SUCCESS, CONFIRM_CHARGE_ERROR]);

  yield put(getChargeListCall());
  yield put(getCardListCall());
}

function onConfirmChargeSuccess(action: ConfirmChargeSuccess) {
  if (action.payload.status === 'Accepted') {
    navigate(routes.SUCCESS_MODAL);
  }

  if (action.payload.status === 'Rejected') {
    Alert.alert('Se rechazó el cobro');
  }
}

function onConfirmChargeError() {
  goBack();
}

export default [
  takeEvery(CONFIRM_CHARGE_SAGA, onConfirmChargeSaga),
  takeEvery(CONFIRM_CHARGE_SUCCESS, onConfirmChargeSuccess),
  takeEvery(CONFIRM_CHARGE_ERROR, onConfirmChargeError),
];
