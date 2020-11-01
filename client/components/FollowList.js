import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../_actionTypes/userInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const FollowList = ({ header, data, onClickMore }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const onClick = useCallback(
    (id) => () => {
      if (header === '팔로잉') {
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: id,
        });
      }

      if (header === '팔로워') {
        dispatch({
          type: REMOVE_FOLLOWER_REQUEST,
          data: id,
        });
      }
    },
    []
  );

  const onClickItem = useCallback(
    (id) => () => {
      Router.push(`/user/${id}`);
    },
    []
  );

  return (
    <Paper className={classes.root} variant="outlined" square>
      <List dense>
        <ListSubheader>{header}</ListSubheader>

        {data?.map((item) => (
          <ListItem key={item.nickname} button onClick={onClickItem(item.id)}>
            <ListItemText primary={item.nickname} />

            <ListItemSecondaryAction>
              <IconButton onClick={onClick(item.id)}>
                <Delete edge="end" aria-label="delete" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" disableElevation fullWidth onClick={onClickMore}>
        더보기
      </Button>
    </Paper>
  );
};

export default memo(FollowList);
