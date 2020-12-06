import { IDocumentType } from 'models/DocumentType';
import { Action } from 'redux';
import {
  DismissError,
  GET_DOCUMENTS_CALL,
  GET_DOCUMENTS_ERROR,
  GET_DOCUMENTS_SUCCESS,
  SET_DOCUMENT_TYPE,
} from 'utils/redux/actions';
import { RequestAction, RequestActionOptions } from 'utils/sagas/request-saga';

export interface GetDocumentsCall extends RequestAction {
  type: typeof GET_DOCUMENTS_CALL;
}

export interface GetDocumentsSuccess extends Action {
  type: typeof GET_DOCUMENTS_SUCCESS;
  payload: IDocumentType[];
}

export interface GetDocumentsError extends Action {
  type: typeof GET_DOCUMENTS_ERROR;
}

export interface SetDocumentType extends Action {
  type: typeof SET_DOCUMENT_TYPE;
  payload?: IDocumentType;
}

export type DocumentsScreenAction =
  | GetDocumentsCall
  | GetDocumentsError
  | GetDocumentsSuccess
  | SetDocumentType
  | DismissError;

export function getDocumentsCall(
  options?: RequestActionOptions,
): GetDocumentsCall {
  return {
    type: GET_DOCUMENTS_CALL,
    payload: {
      url: '/document_types',
      method: 'get',
    },
    meta: options,
  };
}

export function setDocumentType(documentType?: IDocumentType): SetDocumentType {
  return {
    type: SET_DOCUMENT_TYPE,
    payload: documentType,
  };
}
