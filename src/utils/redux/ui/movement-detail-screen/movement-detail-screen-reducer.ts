import { SET_MOVEMENTE_INFO } from '../../actions';
import { SetCharge, MovementInfo } from './movement-detail-screen-action';
import { RootState } from 'utils/redux/root-reducer';
import { selectMovementInfo } from '../../root-selectors';

export const initialState: MovementInfo = {
  description: '',
  displayName: '',
  imageUrl: '',
  amountLabel: '',
  hour: '',
  date: '',
  operationCode: '',
  cashier: '',
};

export const getChargeInfo = (state: RootState) => selectMovementInfo(state);

export default function chargeReducer(
  state: MovementInfo = initialState,
  action: SetCharge,
): MovementInfo {
  if (action.type === SET_MOVEMENTE_INFO) {
    return {
      ...action.data,
    };
  } else {
    return state;
  }
}
