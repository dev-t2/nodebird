import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import userInfo from './userInfo';
import post from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload;
    }

    default: {
      const combinedReducer = combineReducers({
        userInfo,
        post,
      });

      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
