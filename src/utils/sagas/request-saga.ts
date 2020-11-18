import { Action } from 'redux';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { developmentApi } from 'utils/api';
import Api, { apiMethod, apiNames } from 'utils/api';
import { ErrorAction, logOut } from 'utils/redux/actions';
import { selectAuthToken } from 'utils/redux/auth/auth-reducer';
import { Alert } from 'react-native';

enum StatusCode {
  Unauthorized = 401,
}

const defaultAction = (type: string, payload: any, meta?: any) => ({
  type,
  payload,
  meta,
});

export type MockResponse = 'SUCCESS' | 'ERROR';

export interface RequestActionOptions {
  mockResponse?: MockResponse;
  mockData?: any;
}

export interface RequestPayload {
  api?: string;
  method?: apiMethod;
  headers?: any;
  url?: string;
  data?: any;
}

export interface RequestAction extends Action {
  type: string;
  payload: RequestPayload;
  meta?: RequestActionOptions;
}

function* requestSaga(action: RequestAction) {
  const { mockResponse, mockData } = action.meta || {};

  const {
    url,
    method = 'get',
    data,
    headers,
    api = apiNames.development,
  } = action.payload;

  if (mockResponse) {
    yield delay(2000);
    yield put(
      defaultAction(
        action.type.replace('_CALL', '_' + mockResponse),
        mockData,
        action.meta,
      ),
    );
    return;
  }

  const { ok, data: responseData, status, config, duration } = yield call(
    [Api[api], method as any],
    url,
    data,
    headers ? { headers } : undefined,
  );

  if (!ok) {
    yield put(
      defaultAction(
        action.type.replace('_CALL', '_ERROR'),
        {
          status,
          data: responseData,
          config,
          duration,
        },
        action.meta,
      ),
    );

    if (responseData?.errorMessage) {
      Alert.alert('Error', responseData?.errorMessage);
    }

    return;
  }

  yield put(
    defaultAction(
      action.type.replace('_CALL', '_SUCCESS'),
      responseData,
      action.meta,
    ),
  );
}

function* onRequestError(action: ErrorAction) {
  if (action.payload.status === StatusCode.Unauthorized) {
    const authToken = yield select(selectAuthToken);
    if (!authToken) {
      yield put(logOut());
    } else {
      developmentApi.setHeader('Authorization', `Bearer ${authToken}`);
    }
  }
}

const requestAction = (action: Action) => /^.*CALL$/.test(action.type);
const errorAction = (action: Action) => /^.*ERROR$/.test(action.type);

export default [
  takeEvery(requestAction, requestSaga),
  takeEvery(errorAction, onRequestError),
];
