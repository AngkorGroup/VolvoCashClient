import { Card } from 'models/Card';
import { put, takeEvery } from 'redux-saga/effects';
import { GET_CARD_LIST_SUCCESS } from 'utils/redux/actions';
import {
  GetCardListSuccess,
  setCardList,
} from 'utils/redux/ui/card-list-screen/card-list-screen-actions';

function* onGetCardListSuccess(action: GetCardListSuccess) {
  const cardSections = Object.entries(
    action.payload.reduce((acc, card) => {
      if (!acc[card.ownerType]) {
        acc[card.ownerType] = [];
      }
      acc[card.ownerType].push(card);
      return acc;
    }, {} as { [key: string]: Card[] }),
  ).map(([cardCategory, cardArr]: [string, Card[]]) => ({
    title: cardCategory,
    data: cardArr,
  }));
  yield put(setCardList(cardSections));
}

export default [takeEvery(GET_CARD_LIST_SUCCESS, onGetCardListSuccess)];
