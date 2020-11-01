import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { backend } from '../config';

import postSaga from './post';
import userInfoSaga from './userInfo';

axios.defaults.baseURL = backend;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userInfoSaga), fork(postSaga)]);
}
