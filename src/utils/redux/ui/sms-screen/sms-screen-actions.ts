import { IContact } from 'models/Contact';
import { Action } from 'redux';
import {
  DismissError,
  VERIFY_CODE_CALL,
  VERIFY_CODE_ERROR,
  VERIFY_CODE_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface VerifyCodeCall extends RequestAction {
  type: typeof VERIFY_CODE_CALL;
}

export interface VerifyCodeSuccess extends Action {
  type: typeof VERIFY_CODE_SUCCESS;
  payload: VerifyCodeResponse;
}

export interface VerifyCodeError extends Action {
  type: typeof VERIFY_CODE_ERROR;
}

export type SmsScreenAction =
  | VerifyCodeCall
  | VerifyCodeError
  | VerifyCodeSuccess
  | DismissError;

interface VerifyCodeRequest {
  code: string;
  phone: string;
  deviceToken: string;
  devicePlatform: string;
}

export function verifyCodeCall(
  data: VerifyCodeRequest,
  options?: RequestActionOptions,
): VerifyCodeCall {
  return {
    type: VERIFY_CODE_CALL,
    payload: {
      method: 'post',
      url: '/verify_sms_code',
      data,
    },
    meta: options,
  };
}

interface VerifyCodeResponse {
  authToken: string;
  contact: IContact;
}

export function verifyCodeSuccess(
  payload: VerifyCodeResponse,
): VerifyCodeSuccess {
  return {
    type: VERIFY_CODE_SUCCESS,
    payload,
  };
}

export function verifyCodeError(): VerifyCodeError {
  return {
    type: VERIFY_CODE_ERROR,
  };
}
