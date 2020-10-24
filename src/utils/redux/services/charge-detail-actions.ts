import { Charge } from 'models/Charge';
import { Action } from 'redux';
import {
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetChargeDetailCall extends RequestAction {
  type: typeof GET_CHARGE_DETAIL_CALL;
}

export function getChargeDetailCall({
  mockResponse,
  mockData,
}: RequestActionOptions): GetChargeDetailCall {
  return {
    type: GET_CHARGE_DETAIL_CALL,
    payload: {},
    meta: {
      mockResponse,
      mockData,
    },
  };
}

export interface GetChargeDetailSuccess extends Action {
  type: typeof GET_CHARGE_DETAIL_SUCCESS;
  payload: Charge;
}

export interface GetChargeDetailError extends Action {
  type: typeof GET_CHARGE_DETAIL_ERROR;
}
