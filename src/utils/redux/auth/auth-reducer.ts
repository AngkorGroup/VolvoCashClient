import { Contact, IContact } from 'models/Contact';
import { Action } from 'redux';
import {
  LogOutCall,
  LOG_OUT_CALL,
  SET_PHONE,
  SET_PUSH_TOKEN,
  VERIFY_CODE_SUCCESS,
  SET_VERSION,
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
  version?: string;
}

const initialState: AuthState = {
  authToken: undefined,
  phone: '',
  contact: undefined,
  pushToken: undefined,
  version: '',
};

export const selectAuthToken = (state: RootState) =>
  selectAuth(state).authToken;

export const selectPushToken = (state: RootState) =>
  selectAuth(state).pushToken || '';

export const selectPhone = (state: RootState) => selectAuth(state).phone;

export const selectVersion = (state: RootState) => selectAuth(state).version;

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

export interface SetVersion extends Action {
  type: typeof SET_VERSION;
  payload: {
    version: string;
  };
}

export function setVersion(version: string): SetVersion {
  return {
    type: SET_VERSION,
    payload: {
      version,
    },
  };
}

type AuthAction =
  | VerifyCodeSuccess
  | SetPhone
  | LogOutCall
  | SetPushToken
  | SetVersion;

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
    case SET_VERSION:
      return {
        ...state,
        version: action.payload.version,
      };
    case SET_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.payload.pushToken,
      };
    case LOG_OUT_CALL:
      return {
        ...state,
        ...initialState,
        pushToken: state.pushToken,
      };
    default:
      return state;
  }
}
