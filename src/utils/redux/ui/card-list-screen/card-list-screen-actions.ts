import { Card } from 'models/Card';
import { Action } from 'redux';
import {
  DismissError,
  GET_CARD_LIST_CALL,
  GET_CARD_LIST_ERROR,
  GET_CARD_LIST_SUCCESS,
  GO_TO_CARD_DETAIL,
  SET_CARD_LIST,
  SET_OWN_CARD_LIST,
} from 'utils/redux/actions';
import { RequestActionOptions, RequestPayload } from 'utils/sagas/request-saga';
import { CardSections } from './card-list-screen-reducer';

// all_cards: my cards and those of my sub accounts
// own_cards: only my cards, from all my companies (clients)
type GetCardListUseCase = 'all_cards' | 'own_cards';
export interface GetCardListCall {
  type: typeof GET_CARD_LIST_CALL;
  payload: RequestPayload;
  meta: {
    for: GetCardListUseCase;
  };
}

export interface GetCardListSuccess extends Action {
  type: typeof GET_CARD_LIST_SUCCESS;
  payload: Card[];
  meta: {
    for: GetCardListUseCase;
  };
}

export interface GetCardListError extends Action {
  type: typeof GET_CARD_LIST_ERROR;
}

export interface SetCardList extends Action {
  type: typeof SET_CARD_LIST;
  payload: CardSections;
}

export interface SetOwnCardList extends Action {
  type: typeof SET_OWN_CARD_LIST;
  payload: Card[];
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
  | SetOwnCardList
  | DismissError;

export function getCardListCall(
  contactId?: number,
  options?: RequestActionOptions,
): GetCardListCall {
  return {
    type: GET_CARD_LIST_CALL,
    payload: {
      url: '/cards',
      method: 'get',
      data: {
        contactId,
      },
    },
    meta: {
      ...options,
      for: contactId ? 'own_cards' : 'all_cards',
    },
  };
}

export function setCardList(sections: CardSections): SetCardList {
  return {
    type: SET_CARD_LIST,
    payload: sections,
  };
}

export function setOwnCardList(cards: Card[]): SetOwnCardList {
  return {
    type: SET_OWN_CARD_LIST,
    payload: cards,
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
