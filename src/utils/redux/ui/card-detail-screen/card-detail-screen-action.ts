import { Card } from 'models/Card';
import { Action } from 'redux';
import {
  GET_CARD_DETAIL_CALL,
  GET_CARD_DETAIL_ERROR,
  GET_CARD_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetCardDetailCall extends RequestAction {
  type: typeof GET_CARD_DETAIL_CALL;
}

export function getCardDetailCall(
  cardId: number,
  options?: RequestActionOptions,
): GetCardDetailCall {
  return {
    type: GET_CARD_DETAIL_CALL,
    payload: {
      method: 'get',
      url: `/cards/${cardId}`,
    },
    meta: options,
  };
}

export interface GetCardDetailSuccess extends Action {
  type: typeof GET_CARD_DETAIL_SUCCESS;
  payload: Card;
}

export interface GetCardDetailError extends Action {
  type: typeof GET_CARD_DETAIL_ERROR;
}

export type CardDetailScreenAction =
  | GetCardDetailCall
  | GetCardDetailSuccess
  | GetCardDetailError;
