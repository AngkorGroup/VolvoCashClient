import { IClient } from 'models/Client';
import { Action } from 'redux';
import {
  DismissError,
  GET_CLIENTS_CALL,
  GET_CLIENTS_ERROR,
  GET_CLIENTS_SUCCESS,
  SET_CLIENT,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetClientsCall extends RequestAction {
  type: typeof GET_CLIENTS_CALL;
}

export interface GetClientsSuccess extends Action {
  type: typeof GET_CLIENTS_SUCCESS;
  payload: IClient[];
}

export interface GetClientsError extends Action {
  type: typeof GET_CLIENTS_ERROR;
}

export interface SetClient extends Action {
  type: typeof SET_CLIENT;
  payload?: IClient;
}

export type ClientsScreenAction =
  | GetClientsCall
  | GetClientsError
  | GetClientsSuccess
  | SetClient
  | DismissError;

export function getClientsCall(options?: RequestActionOptions): GetClientsCall {
  return {
    type: GET_CLIENTS_CALL,
    payload: {
      url: '/clients',
      method: 'get',
    },
    meta: options,
  };
}

export function setClient(client?: IClient): SetClient {
  return {
    type: SET_CLIENT,
    payload: client,
  };
}
