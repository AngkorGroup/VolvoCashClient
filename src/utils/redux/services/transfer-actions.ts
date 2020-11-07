import { IMoney } from 'models/Money';
import { Transfer } from 'models/Transfer';
import { Action } from 'redux';
import {
  POST_TRANSFER_DETAIL_CALL,
  POST_TRANSFER_DETAIL_ERROR,
  POST_TRANSFER_DETAIL_SUCCESS,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface PostTransferDetailCall extends RequestAction {
  type: typeof POST_TRANSFER_DETAIL_CALL;
}

interface Params {
  amount: IMoney;
  originCardId: number;
  contactId: number;
}

export function postTransferDetailCall(
  { amount, originCardId, contactId }: Params,
  meta?: RequestActionOptions,
): PostTransferDetailCall {
  return {
    type: POST_TRANSFER_DETAIL_CALL,
    payload: {
      url: '/transfers',
      method: 'post',
      data: {
        amount,
        originCardId,
        destinyCard: { contactId },
      },
    },
    meta,
  };
}

export interface PostTransferDetailSuccess extends Action {
  type: typeof POST_TRANSFER_DETAIL_SUCCESS;
  payload: Transfer;
}

export interface PostTransferDetailError extends Action {
  type: typeof POST_TRANSFER_DETAIL_ERROR;
}
