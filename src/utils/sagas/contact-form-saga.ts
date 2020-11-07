import { put, take, takeEvery } from 'redux-saga/effects';
import { goBack } from 'utils/navigation';
import {
  GET_CONTACT_LIST_ERROR,
  GET_CONTACT_LIST_SUCCESS,
  POST_CONTACT_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { getContactListCall } from 'utils/redux/services/contact-actions';

function* onContactFormSuccess() {
  yield put(getContactListCall());
  yield take([GET_CONTACT_LIST_SUCCESS, GET_CONTACT_LIST_ERROR]);
  goBack();
}

export default [takeEvery(POST_CONTACT_DETAIL_SUCCESS, onContactFormSuccess)];
