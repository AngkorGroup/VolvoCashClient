import { combineReducers } from 'redux';
import auth from 'utils/redux/auth/auth-reducer';
import phoneScreen from 'utils/redux/ui/phone-screen/phone-screen-reducer';
import smsScreen from 'utils/redux/ui/sms-screen/sms-screen-reducer';
import cardListScreen from 'utils/redux/ui/card-list-screen/card-list-screen-reducer';

const rootReducer = combineReducers({
  auth,
  ui: combineReducers({
    phoneScreen,
    smsScreen,
    cardListScreen,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
