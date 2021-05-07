import { call, put, takeEvery } from 'redux-saga/effects';
import { registerAC } from '../actionCreaters/userAC';
import { SAGA_LOGIN } from '../types/types';

function loginFetch(action) {
  return fetch('http://localhost:4000/login', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.payload),
  }).then((response) => response.status);
}

function* loginWorker(action) {
  try {
    const loginStatus = yield call(loginFetch, action);
    if (loginStatus === 200) yield put(registerAC(action.payload.name));
  } catch (e) {
    console.log(e);
  }
}

function* loginWatcher() {
  yield takeEvery(SAGA_LOGIN, loginWorker);
}

export default loginWatcher;
