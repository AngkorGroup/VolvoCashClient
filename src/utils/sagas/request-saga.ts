import { Action } from 'redux';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import Api, { apiMethod, apiNames } from 'utils/api';

const defaultAction = (type: string, payload: any) => ({
  type,
  payload,
});

export type MockResponse = 'SUCCESS' | 'ERROR';

export interface RequestActionOptions {
  mockResponse?: MockResponse;
  mockData?: any;
}

export interface RequestAction extends Action {
  type: string;
  payload: {
    api?: string;
    method?: apiMethod;
    headers?: any;
    url?: string;
    data?: any;
  };
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
      defaultAction(action.type.replace('_CALL', '_' + mockResponse), mockData),
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
      defaultAction(action.type.replace('_CALL', '_ERROR'), {
        status,
        data: responseData,
        config,
        duration,
      }),
    );
    return;
  }

  yield put(
    defaultAction(action.type.replace('_CALL', '_SUCCESS'), responseData),
  );
}

const requestAction = (action: Action) => /^.*CALL$/.test(action.type);

export default [takeEvery(requestAction, requestSaga)];
