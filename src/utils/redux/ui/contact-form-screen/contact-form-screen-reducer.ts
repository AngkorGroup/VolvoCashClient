import {
  POST_CONTACT_DETAIL_CALL,
  POST_CONTACT_DETAIL_ERROR,
  POST_CONTACT_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectContactFormScreen } from 'utils/redux/root-selectors';
import {
  PostContactDetailCall,
  PostContactDetailError,
  PostContactDetailSuccess,
} from 'utils/redux/services/contact-actions';

interface ContactFormScreenState {
  loading: boolean;
  error: boolean;
}

export const selectLoading = (state: RootState) =>
  selectContactFormScreen(state).loading;

const initialState: ContactFormScreenState = {
  loading: false,
  error: false,
};

type ContactFormScreenAction =
  | PostContactDetailSuccess
  | PostContactDetailCall
  | PostContactDetailError;

export default function (
  state: ContactFormScreenState = initialState, // NOSONAR
  action: ContactFormScreenAction,
): ContactFormScreenState {
  switch (action.type) {
    case POST_CONTACT_DETAIL_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_CONTACT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case POST_CONTACT_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
