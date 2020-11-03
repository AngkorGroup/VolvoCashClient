import { Charge } from 'models/Charge';
import { Action } from 'redux';
import {
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
  SET_CHARGE_ID,
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

export interface GetChargeDetailError extends Action {
  type: typeof GET_CHARGE_DETAIL_ERROR;
}
