import { Charge } from 'models/Charge';
import {
  CLOSE_CONFIRMATION_MODAL,
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
  SET_CHARGE_ID,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectConfirmationModal } from 'utils/redux/root-selectors';
import {
  GetChargeDetailCall,
  GetChargeDetailError,
  GetChargeDetailSuccess,
  SetChargeId,
} from 'utils/redux/services/charge-detail-actions';
import { CloseConfirmationModal } from './confirmation-modal-actions';

interface ChargeDetailScreenState {
  loading: boolean;
  charge?: Charge;
  chargeId?: number;
}

const initialState: ChargeDetailScreenState = {
  charge: undefined,
  loading: false,
  chargeId: undefined,
};

export type ChargeDetailScreenAction =
  | CloseConfirmationModal
  | GetChargeDetailSuccess
  | GetChargeDetailCall
  | GetChargeDetailError
  | SetChargeId;

export const selectCharge = (state: RootState) => {
  const charge = selectConfirmationModal(state).charge;
  if (charge) {
    return new Charge(charge);
  }
};

export const selectChargeId = (state: RootState) =>
  selectConfirmationModal(state).chargeId;

export const selectLoading = (state: RootState) =>
  selectConfirmationModal(state).loading;

export default function (
  state: ChargeDetailScreenState = initialState,
  action: ChargeDetailScreenAction,
): ChargeDetailScreenState {
  switch (action.type) {
    case SET_CHARGE_ID:
      return {
        ...state,
        chargeId: action.payload.chargeId,
      };
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
