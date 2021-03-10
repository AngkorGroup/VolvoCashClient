import { Card } from 'models/Card';
import { IMoney } from 'models/Money';
import {
  DISMISS_ALERT,
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
  totalBalance?: IMoney;
}

export const selectLoading = (state: RootState) =>
  selectCardListScreen(state).loading;

export const selectTotalBalance = (state: RootState) =>
  selectCardListScreen(state).totalBalance;

export const selectError = (state: RootState) =>
  selectCardListScreen(state).error;
export const selectSections = (state: RootState) => {
  const sections = selectCardListScreen(state).sections;
  return sections.map((section) => ({
    ...section,
    data: section.data.map((card) => new Card(card)),
  }));
};

const initialState: CardListScreenState = {
  loading: false,
  error: false,
  sections: [],
  totalBalance: undefined,
};

export default function (
  state: CardListScreenState = initialState, // NOSONAR
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
        totalBalance: action.payload.totalBalance,
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
    case DISMISS_ALERT:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}
