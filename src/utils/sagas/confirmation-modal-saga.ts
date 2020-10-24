import { takeEvery } from 'redux-saga/effects';
import { CLOSE_CONFIRMATION_MODAL } from 'utils/redux/actions';
import { goBack } from 'utils/navigation';

function* onCloseConfirmationModal() {
  goBack();
}

export default [takeEvery(CLOSE_CONFIRMATION_MODAL, onCloseConfirmationModal)];
