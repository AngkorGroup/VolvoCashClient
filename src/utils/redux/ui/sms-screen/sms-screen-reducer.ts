import {
  DISMISS_ERROR,
  VERIFY_CODE_CALL,
  VERIFY_CODE_ERROR,
  VERIFY_CODE_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectSmsScreen } from 'utils/redux/root-selectors';
import { SmsScreenAction } from 'utils/redux/ui/sms-screen/sms-screen-actions';

interface SmsScreenState {
  loading: boolean;
  error: boolean;
}

export const selectLoading = (state: RootState) =>
  selectSmsScreen(state).loading;

export const selectError = (state: RootState) => selectSmsScreen(state).error;

const initialState: SmsScreenState = {
  loading: false,
  error: false,
};

export default function (
  state: SmsScreenState = initialState,
  action: SmsScreenAction,
): SmsScreenState {
  switch (action.type) {
    case VERIFY_CODE_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case VERIFY_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DISMISS_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}
