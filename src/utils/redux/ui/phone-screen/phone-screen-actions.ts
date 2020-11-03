import { Action } from 'redux';
import {
  DismissError,
  REQUEST_CODE_CALL,
  REQUEST_CODE_ERROR,
  REQUEST_CODE_SUCCESS,
  SET_PHONE,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface RequestCodeCall extends RequestAction {
  type: typeof REQUEST_CODE_CALL;
}

export interface RequestCodeSuccess extends Action {
  type: typeof REQUEST_CODE_SUCCESS;
}

export interface RequestCodeError extends Action {
  type: typeof REQUEST_CODE_ERROR;
}

export interface SetPhone extends Action {
  type: typeof SET_PHONE;
  payload: {
    phone: string;
  };
}

export type PhoneScreenAction =
  | RequestCodeCall
  | RequestCodeError
  | RequestCodeSuccess
  | DismissError;

export function requestCodeCall(
  phone: string,
  options?: RequestActionOptions,
): RequestCodeCall {
  return {
    type: REQUEST_CODE_CALL,
    payload: {
      method: 'post',
      url: '/request_sms_code',
      data: {
        phone,
      },
    },
    meta: {
      mockResponse: options?.mockResponse,
      mockData: options?.mockData,
    },
  };
}

export function requestCodeSuccess(): RequestCodeSuccess {
  return {
    type: REQUEST_CODE_SUCCESS,
  };
}

export function requestCodeError(): RequestCodeError {
  return {
    type: REQUEST_CODE_ERROR,
  };
}

export function setPhone(phone: string): SetPhone {
  return {
    type: SET_PHONE,
    payload: {
      phone,
    },
  };
}
