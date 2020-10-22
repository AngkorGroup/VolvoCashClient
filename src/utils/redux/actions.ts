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

export const SET_PHONE = 'SET_PHONE';
export const SET_CARD_LIST = 'SET_CARD_LIST';

export const GO_TO_CARD_DETAIL = 'GO_TO_CARD_DETAIL';

export const DISMISS_ERROR = 'DISMISS_ERROR';

export const LOG_OUT = 'LOG_OUT';

export interface DismissError extends Action {
  type: typeof DISMISS_ERROR;
}

export interface LogOut extends Action {
  type: typeof LOG_OUT;
}

export function dismissError(): DismissError {
  return {
    type: DISMISS_ERROR,
  };
}

export function logOut(): LogOut {
  return {
    type: LOG_OUT,
  };
}
