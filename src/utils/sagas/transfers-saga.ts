import { put, takeEvery } from 'redux-saga/effects';
import { POST_TRANSFER_DETAIL_SUCCESS } from 'utils/redux/actions';
import { navigate } from 'utils/navigation';
import * as routes from 'utils/routes';
import { getCardListCall } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';

function* onTransferSuccess() {
  navigate(routes.TRANSFER_SUCCESS_MODAL);

  yield put(getCardListCall());
}

export default [takeEvery(POST_TRANSFER_DETAIL_SUCCESS, onTransferSuccess)];
