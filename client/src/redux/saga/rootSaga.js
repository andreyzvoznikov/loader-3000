import registerWatcher from './userRegisterSaga';
import { all } from 'redux-saga/effects';
import loginWatcher from './userLoginSaga';

export default function* rootSaga() {
  yield all([registerWatcher(), loginWatcher()]);
}
