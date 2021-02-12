import { SET_MOVEMENTE_INFO } from '../../actions';

import { Action } from 'redux';

export type MovementInfo = {
  description: string;
  displayName: string;
  imageUrl: string;
  amountLabel: string;
  hour: string;
  date: string;
  operationCode: string;
  cashier: string;
};

export interface SetCharge extends Action {
  type: typeof SET_MOVEMENTE_INFO;
  data: MovementInfo;
}

export function setMovement(data: MovementInfo) {
  return {
    type: SET_MOVEMENTE_INFO,
    data,
  };
}
