import { Card } from 'models/Card';
import { put, select, takeEvery } from 'redux-saga/effects';
import { GET_CARD_LIST_SUCCESS, GO_TO_CARD_DETAIL } from 'utils/redux/actions';
import {
  GetCardListSuccess,
  GoToCardDetail,
  setCardList,
  setOwnCardList,
} from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import { navigate } from 'utils/navigation';
import * as routes from 'utils/routes';
import { getCardDetailCall } from 'utils/redux/ui/card-detail-screen/card-detail-screen-action';
import { selectCard } from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import { selectContact } from 'utils/redux/auth/auth-reducer';
import { Contact } from 'models/Contact';

const parseSections = (action: GetCardListSuccess) => {
  return Object.entries(
    action.payload.data.reduce((acc, iCard) => {
      const card = new Card(iCard);
      if (!card.contact) {
        return acc;
      }

      if (!acc[card.contact.type]) {
        acc[card.contact.type] = [];
      }
      acc[card.contact.type].push(card);
      return acc;
    }, {} as { [key: string]: Card[] }),
  )
    .map(([cardCategory, cardArr]: [string, Card[]]) => {
      return {
        title: cardCategory,
        data: cardArr,
      };
    })
    .sort((a, b) => {
      if (a.title === 'Primary' && b.title === 'Secondary') {
        return -1;
      }
      if (a.title === 'Secondary' && b.title === 'Primary') {
        return 1;
      }
      return 0;
    });
};

function* onGetCardListSuccess(action: GetCardListSuccess) {
  switch (action.meta.for) {
    case 'all_cards':
      const cardSections = parseSections(action);
      yield put(setCardList(cardSections));
      break;
    case 'own_cards':
      yield put(setOwnCardList(action.payload.data));
      break;
    default:
      console.error('Unexpected GetCardListSuccess.meta.for.');
  }
}

function* onGoToCardDetail(_: GoToCardDetail) {
  navigate(routes.CARD_DETAIL_SCREEN);
  const card: Card = yield select(selectCard);
  if (card) {
    yield put(getCardDetailCall(card.id));
  }
}

export default [
  takeEvery(GET_CARD_LIST_SUCCESS, onGetCardListSuccess),
  takeEvery(GO_TO_CARD_DETAIL, onGoToCardDetail),
];
