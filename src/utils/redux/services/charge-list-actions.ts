import { Charge } from 'models/Charge';
import { Action } from 'redux';
import {
  GET_CHARGE_LIST_CALL,
  GET_CHARGE_LIST_ERROR,
  GET_CHARGE_LIST_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetChargeListCall extends RequestAction {
  type: typeof GET_CHARGE_LIST_CALL;
}

export function getChargeListCall(
  meta?: RequestActionOptions,
): GetChargeListCall {
  return {
    type: GET_CHARGE_LIST_CALL,
    payload: {
      url: '/charges',
      method: 'get',
    },
    meta,
  };
}

export interface GetChargeListSuccess extends Action {
  type: typeof GET_CHARGE_LIST_SUCCESS;
  payload: Charge[];
}

export interface GetChargeListError extends Action {
  type: typeof GET_CHARGE_LIST_ERROR;
}
