import { RootState } from 'utils/redux/root-reducer';

export const selectAuth = (state: RootState) => state.auth;
export const selectPhoneScreen = (state: RootState) => state.ui.phoneScreen;
export const selectSmsScreen = (state: RootState) => state.ui.smsScreen;
export const selectCardListScreen = (state: RootState) =>
  state.ui.cardListScreen;
export const selectCardDetailScreen = (state: RootState) =>
  state.ui.cardDetailScreen;
