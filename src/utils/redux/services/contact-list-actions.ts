import { Contact } from 'models/Contact';
import { Action } from 'redux';
import {
  GET_CONTACT_LIST_CALL,
  GET_CONTACT_LIST_ERROR,
  GET_CONTACT_LIST_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetContactListCall extends RequestAction {
  type: typeof GET_CONTACT_LIST_CALL;
}

export function getContactListCall(
  meta?: RequestActionOptions,
): GetContactListCall {
  return {
    type: GET_CONTACT_LIST_CALL,
    payload: {
      url: '/contacts',
      method: 'get',
    },
    meta,
  };
}

export interface GetContactListSuccess extends Action {
  type: typeof GET_CONTACT_LIST_SUCCESS;
  payload: Contact[];
}

export interface GetContactListError extends Action {
  type: typeof GET_CONTACT_LIST_ERROR;
}
