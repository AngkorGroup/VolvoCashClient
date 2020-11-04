import { Contact } from 'models/Contact';
import {
  GET_CONTACT_LIST_CALL,
  GET_CONTACT_LIST_ERROR,
  GET_CONTACT_LIST_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectTransfersScreen } from 'utils/redux/root-selectors';
import {
  GetContactListCall,
  GetContactListError,
  GetContactListSuccess,
} from 'utils/redux/services/contact-list-actions';

interface ContactListScreenState {
  loading: boolean;
  error: boolean;
  contactList: Contact[];
}

export const selectLoading = (state: RootState) =>
  selectTransfersScreen(state).loading;

export const selectError = (state: RootState) =>
  selectTransfersScreen(state).error;

export const selectContactList = (state: RootState) => {
  return selectTransfersScreen(state).contactList.map(
    (contact) => new Contact(contact),
  );
};

const initialState: ContactListScreenState = {
  loading: false,
  error: false,
  contactList: [],
};

type ContactListScreenAction =
  | GetContactListSuccess
  | GetContactListCall
  | GetContactListError;

export default function (
  state: ContactListScreenState = initialState,
  action: ContactListScreenAction,
): ContactListScreenState {
  switch (action.type) {
    case GET_CONTACT_LIST_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        contactList: action.payload,
      };
    case GET_CONTACT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
