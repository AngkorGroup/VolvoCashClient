import { Card } from 'models/Card';
import {
  DISMISS_ERROR,
  GET_CARD_LIST_CALL,
  GET_CARD_LIST_ERROR,
  GET_CARD_LIST_SUCCESS,
  SET_CARD_LIST,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectCardListScreen } from 'utils/redux/root-selectors';
import { CardListScreenAction } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';

export type CardSections = { title: string; data: Card[] }[];

interface CardListScreenState {
  loading: boolean;
  error: boolean;
  sections: CardSections;
}

export const selectLoading = (state: RootState) =>
  selectCardListScreen(state).loading;

export const selectError = (state: RootState) =>
  selectCardListScreen(state).error;
export const selectSections = (state: RootState) =>
  selectCardListScreen(state).sections;

const initialState: CardListScreenState = {
  loading: false,
  error: false,
  sections: [],
};

export default function (
  state: CardListScreenState = initialState,
  action: CardListScreenAction,
): CardListScreenState {
  switch (action.type) {
    case GET_CARD_LIST_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case GET_CARD_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_CARD_LIST:
      return {
        ...state,
        sections: action.payload,
      };
    case DISMISS_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}
