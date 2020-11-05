import { takeEvery } from 'redux-saga/effects';
import { POST_TRANSFER_DETAIL_SUCCESS } from 'utils/redux/actions';
import { popToTop } from 'utils/navigation';

function* onTransferSuccess() {
  popToTop();
}

export default [takeEvery(POST_TRANSFER_DETAIL_SUCCESS, onTransferSuccess)];
