import { IDocumentType } from 'models/DocumentType';
import {
  DISMISS_ALERT,
  GET_DOCUMENTS_CALL,
  GET_DOCUMENTS_ERROR,
  GET_DOCUMENTS_SUCCESS,
} from 'utils/redux/actions';
import { RootState } from 'utils/redux/root-reducer';
import { selectDocumentsScreen } from 'utils/redux/root-selectors';
import { DocumentsScreenAction } from './select-documents-screen-actions';

interface SelectCardsScreenState {
  loading: boolean;
  error: boolean;
  documentTypeList: IDocumentType[];
}

export const selectLoading = (state: RootState) =>
  selectDocumentsScreen(state).loading;

export const selectError = (state: RootState) =>
  selectDocumentsScreen(state).error;

export const selectDocumentTypeList = (state: RootState) =>
  selectDocumentsScreen(state).documentTypeList;

const initialState: SelectCardsScreenState = {
  loading: false,
  error: false,
  documentTypeList: [],
};

export default function (
  state: SelectCardsScreenState = initialState, // NOSONAR
  action: DocumentsScreenAction,
): SelectCardsScreenState {
  switch (action.type) {
    case GET_DOCUMENTS_CALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documentTypeList: action.payload,
        loading: false,
        error: false,
      };
    case GET_DOCUMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
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
