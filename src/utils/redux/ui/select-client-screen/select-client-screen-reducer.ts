import { IClient } from 'models/Client';
import {
  DISMISS_ALERT,
  GET_CLIENTS_CALL,
  GET_CLIENTS_ERROR,
  GET_CLIENTS_SUCCESS,
  SET_CLIENT,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectClientScreen } from 'utils/redux/root-selectors';
import { ClientsScreenAction } from './select-client-screen-actions';

interface SelectCardsScreenState {
  loading: boolean;
  error: boolean;
  clientList: IClient[];
  client?: IClient;
}

export const selectLoading = (state: RootState) =>
  selectClientScreen(state).loading;

export const selectError = (state: RootState) =>
  selectClientScreen(state).error;

export const selectClient = (state: RootState) =>
  selectClientScreen(state).client;

export const selectClientList = (state: RootState) =>
  selectClientScreen(state).clientList;

const initialState: SelectCardsScreenState = {
  loading: false,
  error: false,
  clientList: [],
  client: undefined,
};

export default function (
  state: SelectCardsScreenState = initialState, // NOSONAR
  action: ClientsScreenAction,
): SelectCardsScreenState {
  switch (action.type) {
    case GET_CLIENTS_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clientList: action.payload,
        loading: false,
        error: false,
      };
    case GET_CLIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case DISMISS_ALERT:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}
