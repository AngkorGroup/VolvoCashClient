import { Alert } from 'react-native';
import { put, takeEvery } from 'redux-saga/effects';
import { goBack, navigate, replace } from 'utils/navigation';
import {
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
    confirmChargeCall(action.payload.chargeId, action.payload.confirmed, {
      replace: false,
    }),
  );
}

function* onConfirmChargeSuccess(action: ConfirmChargeSuccess) {
  if (action.payload.status === 'Accepted') {
    if (action.meta.replace) {
      replace(routes.SUCCESS_MODAL);
    } else {
      navigate(routes.SUCCESS_MODAL);
    }
  }

  if (action.payload.status === 'Rejected') {
    Alert.alert('Se rechazó el cobro');
    if (action.meta.replace) {
      goBack();
    }
  }

  yield put(getChargeListCall());
  yield put(getCardListCall());
}

export default [
  takeEvery(CONFIRM_CHARGE_SAGA, onConfirmChargeSaga),
  takeEvery(CONFIRM_CHARGE_SUCCESS, onConfirmChargeSuccess),
];
