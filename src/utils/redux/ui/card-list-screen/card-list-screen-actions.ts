import { Card } from 'models/Card';
import { Action } from 'redux';
import {
  DismissError,
  GET_CARD_LIST_CALL,
  GET_CARD_LIST_ERROR,
  GET_CARD_LIST_SUCCESS,
  GO_TO_CARD_DETAIL,
  SET_CARD_LIST,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';
import { CardSections } from './card-list-screen-reducer';

export interface GetCardListCall extends RequestAction {
  type: typeof GET_CARD_LIST_CALL;
}

export interface GetCardListSuccess extends Action {
  type: typeof GET_CARD_LIST_SUCCESS;
  payload: Card[];
}

export interface GetCardListError extends Action {
  type: typeof GET_CARD_LIST_ERROR;
}

export interface SetCardList extends Action {
  type: typeof SET_CARD_LIST;
  payload: CardSections;
}

export interface GoToCardDetail extends Action {
  type: typeof GO_TO_CARD_DETAIL;
  payload: {
    card: Card;
  };
}

export type CardListScreenAction =
  | GetCardListCall
  | GetCardListError
  | GetCardListSuccess
  | SetCardList
  | DismissError;

export function getCardListCall({
  mockResponse,
  mockData,
}: RequestActionOptions): GetCardListCall {
  return {
    type: GET_CARD_LIST_CALL,
    payload: {},
    meta: {
      mockResponse,
      mockData,
    },
  };
}

export function setCardList(sections: CardSections): SetCardList {
  return {
    type: SET_CARD_LIST,
    payload: sections,
  };
}

export function goToCardDetail(card: Card): GoToCardDetail {
  return {
    type: GO_TO_CARD_DETAIL,
    payload: {
      card,
    },
  };
}
