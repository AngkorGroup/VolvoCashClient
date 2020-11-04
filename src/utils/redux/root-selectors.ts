import { RootState } from 'utils/redux/root-reducer';

export const selectAuth = (state: RootState) => state.auth;
export const selectPhoneScreen = (state: RootState) => state.ui.phoneScreen;
export const selectSmsScreen = (state: RootState) => state.ui.smsScreen;
export const selectCardListScreen = (state: RootState) =>
  state.ui.cardListScreen;
export const selectChargeListScreen = (state: RootState) =>
  state.ui.chargeListScreen;
export const selectCardDetailScreen = (state: RootState) =>
  state.ui.cardDetailScreen;
export const selectConfirmationModal = (state: RootState) =>
  state.ui.confirmationModal;
export const selectTransfersScreen = (state: RootState) =>
  state.ui.transfersScreen;
