import produce from '../util/produce';

import {
  ADD_POST_TO_ME,
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
  REMOVE_POST_OF_ME,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../_actionTypes/userInfo';

export const initialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  removefollowerLoading: false,
  removefollowerDone: false,
  removefollowerError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  user: null,
  otherUser: null,
};

export const loginRequestAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.user = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;

      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.otherUser = action.data;
        break;

      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;

      case LOGIN_SUCCESS:
        draft.user = action.data;
        draft.loginLoading = false;
        draft.loginDone = true;
        break;

      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;

      case LOGOUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;

      case LOGOUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.user = null;
        break;

      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
        break;

      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;

      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;

      case SIGNUP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;

      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;

      case FOLLOW_SUCCESS:
        draft.user.Followings.push({ id: action.data.UserId });
        draft.followLoading = false;
        draft.followDone = true;
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;

      case UNFOLLOW_SUCCESS:
        draft.user.Followings = draft.user.Followings.filter(
          (following) => following.id !== action.data.UserId
        );
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        break;

      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowLoading = true;
        draft.removeFollowDone = false;
        draft.removeFollowError = null;
        break;

      case REMOVE_FOLLOWER_SUCCESS:
        draft.user.Followers = draft.user.Followers.filter(
          (follower) => follower.id !== action.data.UserId
        );
        draft.removeFollowLoading = false;
        draft.removeFollowDone = true;
        break;

      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowLoading = false;
        draft.removeFollowError = action.error;
        break;

      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;

      case LOAD_FOLLOWERS_SUCCESS:
        draft.user.Followers = action.data;
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        break;

      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;

      case LOAD_FOLLOWINGS_SUCCESS:
        draft.user.Followings = action.data;
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        break;

      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.user.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter((post) => post.id !== action.data);
        break;

      default:
        break;
    }
  });

export default reducer;
