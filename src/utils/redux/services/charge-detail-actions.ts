import { Charge } from 'models/Charge';
import { Action } from 'redux';
import {
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
  SET_CHARGE_ID,
  CONFIRM_CHARGE_CALL,
  CONFIRM_CHARGE_SAGA,
  CONFIRM_CHARGE_SUCCESS,
  CONFIRM_CHARGE_ERROR,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetChargeDetailCall extends RequestAction {
  type: typeof GET_CHARGE_DETAIL_CALL;
}

export function getChargeDetailCall(
  chargeId: number,
  meta?: RequestActionOptions,
): GetChargeDetailCall {
  return {
    type: GET_CHARGE_DETAIL_CALL,
    payload: {
      method: 'get',
      url: `/charges/${chargeId}`,
    },
    meta,
  };
}

export interface GetChargeDetailSuccess extends Action {
  type: typeof GET_CHARGE_DETAIL_SUCCESS;
  payload: Charge;
}

export interface GetChargeDetailError extends Action {
  type: typeof GET_CHARGE_DETAIL_ERROR;
}

export interface SetChargeId extends Action {
  type: typeof SET_CHARGE_ID;
  payload: {
    chargeId: number;
  };
}

export function setChargeId(chargeId: number): SetChargeId {
  return {
    type: SET_CHARGE_ID,
    payload: { chargeId },
  };
}

export interface ConfirmChargeCall extends RequestAction {
  type: typeof CONFIRM_CHARGE_CALL;
}

export function confirmChargeCall(
  chargeId: number,
  confirmed: boolean,
): ConfirmChargeCall {
  return {
    type: CONFIRM_CHARGE_CALL,
    payload: {
      url: `/charges/${chargeId}/confirm`,
      method: 'post',
      data: {
        confirmed,
      },
    },
  };
}

export interface ConfirmChargeSuccess extends Action {
  type: typeof CONFIRM_CHARGE_SUCCESS;
  payload: Charge;
}

export interface ConfirmChargeError extends Action {
  type: typeof CONFIRM_CHARGE_ERROR;
}

export interface ConfirmChargeSaga extends Action {
  type: typeof CONFIRM_CHARGE_SAGA;
  payload: {
    chargeId: number;
    confirmed: boolean;
  };
}

export function confirmChargeSaga(
  chargeId: number,
  confirmed: boolean,
): ConfirmChargeSaga {
  return {
    type: CONFIRM_CHARGE_SAGA,
    payload: {
      chargeId,
      confirmed,
    },
  };
}
