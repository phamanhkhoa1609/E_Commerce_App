// index/saga.js

import { takeEvery } from 'redux-saga/effects';
import { ADD_TO_CART } from './action';

function* handleAddToCart(action) {
  console.log('Product added to cart:', action.payload.name);
  yield null; 
}

export default function* rootSaga() {
  yield takeEvery(ADD_TO_CART, handleAddToCart);
}
