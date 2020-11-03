import {
  DISMISS_ALERT,
  REQUEST_CODE_CALL,
  REQUEST_CODE_ERROR,
  REQUEST_CODE_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectPhoneScreen } from 'utils/redux/root-selectors';
import { PhoneScreenAction } from 'utils/redux/ui/phone-screen/phone-screen-actions';

interface PhoneScreenState {
  loading: boolean;
  error: boolean;
}

export const selectLoading = (state: RootState) =>
  selectPhoneScreen(state).loading;

export const selectError = (state: RootState) => selectPhoneScreen(state).error;

const initialState: PhoneScreenState = {
  loading: false,
  error: false,
};

export default function (
  state: PhoneScreenState = initialState,
  action: PhoneScreenAction,
): PhoneScreenState {
  switch (action.type) {
    case REQUEST_CODE_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case REQUEST_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case REQUEST_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DISMISS_ALERT:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}
