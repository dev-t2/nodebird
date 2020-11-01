import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../_actionTypes/userInfo';

const Follow = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  const isFollowing = user?.Followings.find((following) => following.id === post.User.id);

  const onClick = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button color="primary" onClick={onClick}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default memo(Follow);
