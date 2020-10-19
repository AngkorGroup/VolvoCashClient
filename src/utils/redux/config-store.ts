import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'utils/sagas/root-saga';
import rootReducer from 'utils/redux/root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
