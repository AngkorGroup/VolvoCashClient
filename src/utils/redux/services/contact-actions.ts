import { Contact, IContact } from 'models/Contact';
import { Action } from 'redux';
import {
  GET_CONTACT_LIST_CALL,
  GET_CONTACT_LIST_ERROR,
  GET_CONTACT_LIST_SUCCESS,
  POST_CONTACT_DETAIL_CALL,
  POST_CONTACT_DETAIL_ERROR,
  POST_CONTACT_DETAIL_SUCCESS,
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

export interface PostContactDetailCall extends RequestAction {
  type: typeof POST_CONTACT_DETAIL_CALL;
}

export function postContactDetailCall(
  contact: IContact,
  meta?: RequestActionOptions,
): PostContactDetailCall {
  return {
    type: POST_CONTACT_DETAIL_CALL,
    payload: {
      url: '/contacts',
      method: 'post',
      data: contact,
    },
    meta,
  };
}

export interface GetContactListSuccess extends Action {
  type: typeof GET_CONTACT_LIST_SUCCESS;
  payload: {
    data: Contact[];
    showButton: boolean;
  };
}

export interface GetContactListError extends Action {
  type: typeof GET_CONTACT_LIST_ERROR;
}

export interface PostContactDetailSuccess extends Action {
  type: typeof POST_CONTACT_DETAIL_SUCCESS;
}

export interface PostContactDetailError extends Action {
  type: typeof POST_CONTACT_DETAIL_ERROR;
}
