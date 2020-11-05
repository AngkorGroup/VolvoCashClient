import { Charge } from 'models/Charge';
import {
  CLOSE_CONFIRMATION_MODAL,
  CONFIRM_CHARGE_CALL,
  CONFIRM_CHARGE_ERROR,
  CONFIRM_CHARGE_SUCCESS,
  GET_CHARGE_DETAIL_CALL,
  GET_CHARGE_DETAIL_ERROR,
  GET_CHARGE_DETAIL_SUCCESS,
  SET_CHARGE_ID,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectConfirmationModal } from 'utils/redux/root-selectors';
import {
  ConfirmChargeCall,
  ConfirmChargeError,
  ConfirmChargeSuccess,
  GetChargeDetailCall,
  GetChargeDetailError,
  GetChargeDetailSuccess,
  SetChargeId,
} from 'utils/redux/services/charge-detail-actions';
import { CloseConfirmationModal } from './confirmation-modal-actions';

interface ChargeDetailScreenState {
  loading: boolean; // get call
  confirmLoading: boolean;
  charge?: Charge;
  chargeId?: number;
}

const initialState: ChargeDetailScreenState = {
  charge: undefined,
  loading: false,
  confirmLoading: false,
  chargeId: undefined,
};

export type ChargeDetailScreenAction =
  | CloseConfirmationModal
  | GetChargeDetailSuccess
  | GetChargeDetailCall
  | GetChargeDetailError
  | SetChargeId
  | ConfirmChargeCall
  | ConfirmChargeSuccess
  | ConfirmChargeError;

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

export const selectConfirmLoading = (state: RootState) =>
  selectConfirmationModal(state).confirmLoading;

export default function (
  state: ChargeDetailScreenState = initialState, // NOSONAR
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
    case CONFIRM_CHARGE_CALL:
      return {
        ...state,
        confirmLoading: true,
      };
    case CONFIRM_CHARGE_SUCCESS:
      return {
        ...state,
        confirmLoading: false,
        charge: action.payload,
      };
    case CONFIRM_CHARGE_ERROR:
      return {
        ...state,
        confirmLoading: false,
      };
    default:
      return state;
  }
}
