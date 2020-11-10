import { Contact, IContact } from 'models/Contact';
import { Action } from 'redux';
import {
  LogOut,
  LOG_OUT,
  SET_PHONE,
  SET_PUSH_TOKEN,
  VERIFY_CODE_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from '../root-reducer';
import { selectAuth } from '../root-selectors';
import { SetPhone } from '../ui/phone-screen/phone-screen-actions';
import { VerifyCodeSuccess } from '../ui/sms-screen/sms-screen-actions';

interface AuthState {
  authToken?: string;
  pushToken?: string;
  phone: string;
  contact?: IContact;
}

const initialState: AuthState = {
  authToken: undefined,
  phone: '',
  contact: undefined,
  pushToken: undefined,
};

export const selectAuthToken = (state: RootState) =>
  selectAuth(state).authToken;

export const selectPushToken = (state: RootState) =>
  selectAuth(state).pushToken || '';

export const selectPhone = (state: RootState) => selectAuth(state).phone;

export const selectContact = (state: RootState) => {
  const contact = selectAuth(state).contact;
  if (contact) {
    return new Contact(contact);
  }
};

export interface SetPushToken extends Action {
  type: typeof SET_PUSH_TOKEN;
  payload: {
    pushToken: string;
  };
}

export function setPushToken(pushToken: string): SetPushToken {
  return {
    type: SET_PUSH_TOKEN,
    payload: {
      pushToken,
    },
  };
}

type AuthAction = VerifyCodeSuccess | SetPhone | LogOut | SetPushToken;

export default function (
  state: AuthState = initialState, // NOSONAR
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        authToken: action.payload.authToken,
        contact: action.payload.contact,
      };
    case SET_PHONE:
      return {
        ...state,
        phone: action.payload.phone,
      };
    case SET_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.payload.pushToken,
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
