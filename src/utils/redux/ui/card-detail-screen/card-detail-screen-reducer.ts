import { Batch } from 'models/Batch';
import { Card } from 'models/Card';
import { Movement } from 'models/Movement';
import {
  GET_CARD_DETAIL_CALL,
  GET_CARD_DETAIL_ERROR,
  GET_CARD_DETAIL_SUCCESS,
  GO_TO_CARD_DETAIL,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectCardDetailScreen } from 'utils/redux/root-selectors';
import { GoToCardDetail } from '../card-list-screen/card-list-screen-actions';
import {
  GetCardDetailCall,
  GetCardDetailError,
  GetCardDetailSuccess,
} from './card-detail-screen-action';

interface CardDetailScreenState {
  loading: boolean;
  card?: Card;
}

const initialState: CardDetailScreenState = {
  card: undefined,
  loading: false,
};

export type CardDetailScreenAction =
  | GoToCardDetail
  | GetCardDetailSuccess
  | GetCardDetailCall
  | GetCardDetailError;

export const selectCard = (state: RootState) => {
  const json = selectCardDetailScreen(state).card;
  if (json) {
    return new Card(json);
  }
};

export const selectLoading = (state: RootState) =>
  selectCardDetailScreen(state).loading;

export const selectCardMovements = (state: RootState) => {
  const movements = selectCardDetailScreen(state).card?.movements || [];
  return movements.map((movement) => new Movement(movement));
};

export const selectCardBatches = (state: RootState) => {
  const batches =
    selectCardDetailScreen(state).card?.cardBatchesWithBalance || [];
  return batches.map((batch) => new Batch(batch));
};

export default function (
  state: CardDetailScreenState = initialState, // NOSONAR
  action: CardDetailScreenAction,
): CardDetailScreenState {
  switch (action.type) {
    case GO_TO_CARD_DETAIL:
      return {
        ...state,
        card: action.payload.card,
      };
    case GET_CARD_DETAIL_CALL:
      return {
        ...state,
        loading: true,
      };
    case GET_CARD_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_CARD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        card: action.payload,
      };
    default:
      return state;
  }
}
