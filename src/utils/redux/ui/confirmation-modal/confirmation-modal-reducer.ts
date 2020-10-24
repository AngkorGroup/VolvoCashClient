import { Charge } from 'models/Charge';
import {
  CLOSE_CONFIRMATION_MODAL,
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectConfirmationModal } from 'utils/redux/root-selectors';
import {
  GetChargeDetailCall,
  GetChargeDetailError,
  GetChargeDetailSuccess,
} from 'utils/redux/services/charge-detail-actions';
import { CloseConfirmationModal } from './confirmation-modal-actions';

interface ChargeDetailScreenState {
  loading: boolean;
  charge?: Charge;
}

const initialState: ChargeDetailScreenState = {
  charge: undefined,
  loading: false,
};

export type ChargeDetailScreenAction =
  | CloseConfirmationModal
  | GetChargeDetailSuccess
  | GetChargeDetailCall
  | GetChargeDetailError;

export const selectCharge = (state: RootState) =>
  selectConfirmationModal(state).charge;

export const selectLoading = (state: RootState) =>
  selectConfirmationModal(state).loading;

export default function (
  state: ChargeDetailScreenState = initialState,
  action: ChargeDetailScreenAction,
): ChargeDetailScreenState {
  switch (action.type) {
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        charge: undefined,
      };
    case GET_CHARGE_DETAIL_CALL:
      return {
        ...state,
        charge: undefined,
        loading: true,
      };
    case GET_CHARGE_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_CHARGE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        charge: action.payload,
      };
    default:
      return state;
  }
}
