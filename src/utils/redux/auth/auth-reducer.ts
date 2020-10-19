import {
  LogOut,
  LOG_OUT,
  SET_PHONE,
  VERIFY_CODE_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from '../root-reducer';
import { selectAuth } from '../root-selectors';
import { SetPhone } from '../ui/phone-screen/phone-screen-actions';
import { VerifyCodeSuccess } from '../ui/sms-screen/sms-screen-actions';

interface AuthState {
  authToken?: string;
  phone: string;
}

const initialState: AuthState = {
  authToken: undefined,
  phone: '',
};

export const selectAuthToken = (state: RootState) =>
  selectAuth(state).authToken;

export const selectPhone = (state: RootState) => selectAuth(state).phone;

type AuthAction = VerifyCodeSuccess | SetPhone | LogOut;

export default function (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        authToken: action.payload.authToken,
      };
    case SET_PHONE:
      return {
        ...state,
        phone: action.payload.phone,
      };
    case LOG_OUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
