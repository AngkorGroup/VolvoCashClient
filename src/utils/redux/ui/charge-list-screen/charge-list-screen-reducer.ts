import { Charge } from 'models/Charge';
import {
  GET_CHARGE_LIST_CALL,
  GET_CHARGE_LIST_ERROR,
  GET_CHARGE_LIST_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectChargeListScreen } from 'utils/redux/root-selectors';
import {
  GetChargeListCall,
  GetChargeListError,
  GetChargeListSuccess,
} from 'utils/redux/services/charge-list-actions';

interface ChargeListScreenState {
  loading: boolean;
  error: boolean;
  chargeList: Charge[];
}

export const selectLoading = (state: RootState) =>
  selectChargeListScreen(state).loading;

export const selectError = (state: RootState) =>
  selectChargeListScreen(state).error;

export const selectChargeList = (state: RootState) => {
  return selectChargeListScreen(state).chargeList.map(
    (charge) => new Charge(charge),
  );
};

const initialState: ChargeListScreenState = {
  loading: false,
  error: false,
  chargeList: [],
};

type ChargeListScreenAction =
  | GetChargeListSuccess
  | GetChargeListCall
  | GetChargeListError;

export default function (
  state: ChargeListScreenState = initialState,
  action: ChargeListScreenAction,
): ChargeListScreenState {
  switch (action.type) {
    case GET_CHARGE_LIST_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_CHARGE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        chargeList: action.payload,
      };
    case GET_CHARGE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
