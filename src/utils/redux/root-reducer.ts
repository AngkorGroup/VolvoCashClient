import { combineReducers } from 'redux';
import auth from 'utils/redux/auth/auth-reducer';
import phoneScreen from 'utils/redux/ui/phone-screen/phone-screen-reducer';
import smsScreen from 'utils/redux/ui/sms-screen/sms-screen-reducer';
import cardListScreen from 'utils/redux/ui/card-list-screen/card-list-screen-reducer';
import chargeListScreen from 'utils/redux/ui/charge-list-screen/charge-list-screen-reducer';
import cardDetailScreen from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import confirmationModal from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';
import transfersScreen from 'utils/redux/ui/transfers-screen/transfers-screen-reducer';
import contactFormScreen from 'utils/redux/ui/contact-form-screen/contact-form-screen-reducer';
import selectCardScreen from 'utils/redux/ui/select-card-screen/select-card-screen-reducer';
import transferFormScreen from 'utils/redux/ui/transfer-form-screen/transfer-form-screen-reducer';

const rootReducer = combineReducers({
  auth,
  ui: combineReducers({
    phoneScreen,
    smsScreen,
    cardListScreen,
    cardDetailScreen,
    chargeListScreen,
    confirmationModal,
    transfersScreen,
    contactFormScreen,
    selectCardScreen,
    transferFormScreen,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
