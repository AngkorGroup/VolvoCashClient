import { Card } from 'models/Card';
import {
  DISMISS_ALERT,
  GET_CARD_LIST_CALL,
  GET_CARD_LIST_ERROR,
  GET_CARD_LIST_SUCCESS,
  SET_OWN_CARD_LIST,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectCardScreen } from 'utils/redux/root-selectors';
import { CardListScreenAction } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';

interface SelectCardsScreenState {
  loading: boolean;
  error: boolean;
  cardList: Card[];
}

export const selectLoading = (state: RootState) =>
  selectCardScreen(state).loading;

export const selectError = (state: RootState) => selectCardScreen(state).error;

export const selectCardList = (state: RootState) => {
  const cards = selectCardScreen(state).cardList;
  return cards.map((card) => new Card(card));
};

const initialState: SelectCardsScreenState = {
  loading: false,
  error: false,
  cardList: [],
};

export default function (
  state: SelectCardsScreenState = initialState, // NOSONAR
  action: CardListScreenAction,
): SelectCardsScreenState {
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
    case SET_OWN_CARD_LIST:
      return {
        ...state,
        cardList: action.payload,
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
