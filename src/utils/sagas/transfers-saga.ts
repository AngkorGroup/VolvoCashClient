import { takeEvery } from 'redux-saga/effects';
import { POST_TRANSFER_DETAIL_SUCCESS } from 'utils/redux/actions';
import { navigate } from 'utils/navigation';
import * as routes from 'utils/routes';

function* onTransferSuccess() {
  navigate(routes.TRANSFER_SUCCESS_MODAL);
}

export default [takeEvery(POST_TRANSFER_DETAIL_SUCCESS, onTransferSuccess)];
