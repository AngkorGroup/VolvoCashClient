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
    action.payload.reduce((acc, iCard) => {
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
  ).map(([cardCategory, cardArr]: [string, Card[]]) => ({
    title: cardCategory,
    data: cardArr,
  }));
};

const parseOwnCards = (action: GetCardListSuccess, currentUser: Contact) => {
  return action.payload.filter((card) => card.contactId === currentUser.id);
};

function* onGetCardListSuccess(action: GetCardListSuccess) {
  const cardSections = parseSections(action);
  yield put(setCardList(cardSections));

  const currentUser = yield select(selectContact);
  const ownCards = parseOwnCards(action, currentUser);
  yield put(setOwnCardList(ownCards));
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
