import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { logoutRequestAction } from '../_reducers/userInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2, 0),
  },
  typography: {
    textAlign: 'center',
  },
}));

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  const classes = useStyles();

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={user.nickname}
        avatar={
          <Link href={`/user/${user.id}`} prefetch={false}>
            <a>
              <Avatar aria-label="avatar">{user.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        action={
          <>
            <Button className={classes.profile}>
              <Link href="/profile" prefetch={false}>
                <a>프로필</a>
              </Link>
            </Button>

            <Button onClick={onClickLogout}>로그아웃</Button>
          </>
        }
      />

      <CardContent className={classes.content}>
        <Grid container>
          <Grid item xs={4}>
            <Link href={`/user/${user.id}`} prefetch={false}>
              <a>
                <Typography className={classes.typography}>게시물</Typography>
                <Typography className={classes.typography}>{user.Posts.length}</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="/profile" prefetch={false}>
              <a>
                <Typography className={classes.typography}>팔로잉</Typography>
                <Typography className={classes.typography}>{user.Followings.length}</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="/profile" prefetch={false}>
              <a>
                <Typography className={classes.typography}>팔로워</Typography>
                <Typography className={classes.typography}>{user.Followers.length}</Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(UserProfile);
