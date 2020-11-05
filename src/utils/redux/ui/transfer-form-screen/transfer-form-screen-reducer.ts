import { Transfer } from 'models/Transfer';
import {
  POST_TRANSFER_DETAIL_CALL,
  POST_TRANSFER_DETAIL_ERROR,
  POST_TRANSFER_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectTransferFormScreen } from 'utils/redux/root-selectors';
import {
  PostTransferDetailCall,
  PostTransferDetailError,
  PostTransferDetailSuccess,
} from 'utils/redux/services/transfer-actions';

interface TransferFormState {
  loading: boolean;
  error: boolean;
  transfer?: Transfer;
}

export const selectLoading = (state: RootState) =>
  selectTransferFormScreen(state).loading;

export const selectError = (state: RootState) =>
  selectTransferFormScreen(state).error;

export const selectTransfer = (state: RootState) => {
  const { transfer } = selectTransferFormScreen(state);
  if (transfer) {
    return new Transfer(transfer);
  }
};

const initialState: TransferFormState = {
  loading: false,
  error: false,
  transfer: undefined,
};

type TransferFormAction =
  | PostTransferDetailSuccess
  | PostTransferDetailCall
  | PostTransferDetailError;

export default function (
  state: TransferFormState = initialState, // NOSONAR
  action: TransferFormAction,
): TransferFormState {
  switch (action.type) {
    case POST_TRANSFER_DETAIL_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_TRANSFER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        transfer: action.payload,
      };
    case POST_TRANSFER_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
