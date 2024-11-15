// 1index/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cartReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(cartReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
