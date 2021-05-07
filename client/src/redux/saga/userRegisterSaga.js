import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { registerAC } from '../actionCreaters/userAC';
import { SAGA_REGISTER } from '../types/types';

function registerFetch(action) {
  return fetch('http://localhost:4000/register', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.payload),
  }).then((response) => response.status);
}

function* registerWorker(action) {
  try {
    const registerStatus = yield call(registerFetch, action);
    if (registerStatus === 200) yield put(registerAC(action.payload.name));
  } catch (e) {
    console.log(e);
  }
}

function* registerWatcher() {
  yield takeEvery(SAGA_REGISTER, registerWorker);
}

export default registerWatcher;
