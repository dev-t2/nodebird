import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../_actionTypes/userInfo';

const changeNicknameAPI = (data) => axios.patch('/user/nickname', { nickname: data });

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);

    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: error.response.data,
    });
  }
}

const loadMyInfoAPI = () => axios.get('/user');

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

const loadUserAPI = (data) => axios.get(`/user/${data}`);

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);

    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: error.response.data,
    });
  }
}

const loginAPI = (data) => axios.post('/user/login', data);

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);

    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data,
    });
  }
}

const logoutAPI = () => axios.post('/user/logout');

function* logout() {
  try {
    yield call(logoutAPI);

    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      error: error.response.data,
    });
  }
}

const signupAPI = (data) => axios.post('/user', data);

function* signup(action) {
  try {
    yield call(signupAPI, action.data);

    yield delay(1000);

    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      error: error.response.data,
    });
  }
}

const followAPI = (data) => axios.patch(`/user/${data}/follow`);

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);

    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

const unfollowAPI = (data) => axios.delete(`/user/${data}/follow`);

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

const removeFollowerAPI = (data) => axios.delete(`/user/follower/${data}`);

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);

    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: error.response.data,
    });
  }
}

const loadFollowersAPI = (data) => axios.get('/user/followers', data);

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);

    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: error.response.data,
    });
  }
}

const loadFollowingsAPI = (data) => axios.get('/user/followings', data);

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);

    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

export default function* userInfoSaga() {
  yield all([
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
  ]);
}
