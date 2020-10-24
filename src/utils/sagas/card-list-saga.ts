import { Card } from 'models/Card';
import { put, takeEvery } from 'redux-saga/effects';
import { GET_CARD_LIST_SUCCESS, GO_TO_CARD_DETAIL } from 'utils/redux/actions';
import {
  GetCardListSuccess,
  GoToCardDetail,
  setCardList,
} from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import { navigate } from 'utils/navigation';
import * as routes from 'utils/routes';
import { getCardDetailCall } from 'utils/redux/ui/card-detail-screen/card-detail-screen-action';

function* onGetCardListSuccess(action: GetCardListSuccess) {
  const cardSections = Object.entries(
    action.payload.reduce((acc, iCard) => {
      const card = new Card(iCard);
      if (!acc[card.contact.type]) {
        acc[card.contact.type] = [];
      }
      acc[card.contact.type].push(card);
      return acc;
    }, {} as { [key: string]: Card[] }),
  ).map(([cardCategory, cardArr]: [string, Card[]]) => ({
    title: cardCategory,
    data: cardArr,
  }));
  console.log('cardSections: ', cardSections);
  yield put(setCardList(cardSections));
}

function* onGoToCardDetail(_: GoToCardDetail) {
  navigate(routes.CARD_DETAIL_SCREEN);
  yield put(getCardDetailCall({ mockResponse: 'SUCCESS', mockData: {} }));
}

export default [
  takeEvery(GET_CARD_LIST_SUCCESS, onGetCardListSuccess),
  takeEvery(GO_TO_CARD_DETAIL, onGoToCardDetail),
];
