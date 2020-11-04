import { Action } from 'redux';

export const REQUEST_CODE_CALL = 'REQUEST_CODE_CALL';
export const REQUEST_CODE_SUCCESS = 'REQUEST_CODE_SUCCESS';
export const REQUEST_CODE_ERROR = 'REQUEST_CODE_ERROR';

export const VERIFY_CODE_CALL = 'VERIFY_CODE_CALL';
export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';
export const VERIFY_CODE_ERROR = 'VERIFY_CODE_ERROR';

export const GET_CARD_LIST_CALL = 'GET_CARD_LIST_CALL';
export const GET_CARD_LIST_SUCCESS = 'GET_CARD_LIST_SUCCESS';
export const GET_CARD_LIST_ERROR = 'GET_CARD_LIST_ERROR';

export const GET_CARD_DETAIL_CALL = 'GET_CARD_DETAIL_CALL';
export const GET_CARD_DETAIL_SUCCESS = 'GET_CARD_DETAIL_SUCCESS';
export const GET_CARD_DETAIL_ERROR = 'GET_CARD_DETAIL_ERROR';

export const GET_CHARGE_DETAIL_CALL = 'GET_CHARGE_DETAIL_CALL';
export const GET_CHARGE_DETAIL_SUCCESS = 'GET_CHARGE_DETAIL_SUCCESS';
export const GET_CHARGE_DETAIL_ERROR = 'GET_CHARGE_DETAIL_ERROR';

export const GET_CHARGE_LIST_CALL = 'GET_CHARGE_LIST_CALL';
export const GET_CHARGE_LIST_SUCCESS = 'GET_CHARGE_LIST_SUCCESS';
export const GET_CHARGE_LIST_ERROR = 'GET_CHARGE_LIST_ERROR';

export const GET_CONTACT_LIST_CALL = 'GET_CONTACT_LIST_CALL';
export const GET_CONTACT_LIST_SUCCESS = 'GET_CONTACT_LIST_SUCCESS';
export const GET_CONTACT_LIST_ERROR = 'GET_CONTACT_LIST_ERROR';

export const POST_CONTACT_DETAIL_CALL = 'POST_CONTACT_DETAIL_CALL';
export const POST_CONTACT_DETAIL_SUCCESS = 'POST_CONTACT_DETAIL_SUCCESS';
export const POST_CONTACT_DETAIL_ERROR = 'POST_CONTACT_DETAIL_ERROR';

export const CONFIRM_CHARGE_SAGA = 'CONFIRM_CHARGE_SAGA';
export const CONFIRM_CHARGE_CALL = 'CONFIRM_CHARGE_CALL';
export const CONFIRM_CHARGE_SUCCESS = 'CONFIRM_CHARGE_SUCCESS';
export const CONFIRM_CHARGE_ERROR = 'CONFIRM_CHARGE_ERROR';

export const SET_PHONE = 'SET_PHONE';
export const SET_CARD_LIST = 'SET_CARD_LIST';
export const SET_OWN_CARD_LIST = 'SET_OWN_CARD_LIST';
export const SET_CHARGE_ID = 'SET_CHARGE_ID';

export const GO_TO_CARD_DETAIL = 'GO_TO_CARD_DETAIL';
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL';

export const DISMISS_ALERT = 'DISMISS_ALERT';

export const LOG_OUT = 'LOG_OUT';

export interface DismissError extends Action {
  type: typeof DISMISS_ALERT;
}

export interface LogOut extends Action {
  type: typeof LOG_OUT;
}

export interface ErrorAction extends Action {
  payload: {
    status: number;
    data: any;
    config: any;
    duration: number;
  };
}

export function dismissError(): DismissError {
  return {
    type: DISMISS_ALERT,
  };
}

export function logOut(): LogOut {
  return {
    type: LOG_OUT,
  };
}
