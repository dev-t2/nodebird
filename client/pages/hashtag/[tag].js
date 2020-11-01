import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';

import axios from 'axios';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import wrapper from '../../_store/configureStore';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../_actionTypes/userInfo';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../_actionTypes/post';

import PostCard from '../../components/PostCard';
import Layout from '../../components/Layout';

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

const Hashtag = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { otherUser } = useSelector((state) => state.userInfo);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    (state) => state.post
  );
  const router = useRouter();
  const { tag } = router.query;

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;

          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId,
            data: tag,
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts, tag]);

  return (
    <Layout>
      {otherUser && (
        <Head>
          <title>{otherUser.nickname}님의 게시글</title>
          <meta name="description" content={`${otherUser.nickname}님의 게시글`} />
          <meta property="og:title" content={`${otherUser.nickname}님의 게시글`} />
          <meta property="og:description" content={`${otherUser.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/hashtag/${tag}`} />
        </Head>
      )}

      {otherUser && (
        <Card className={classes.root} variant="outlined">
          <CardHeader
            title={otherUser.nickname}
            avatar={<Avatar aria-label="avatar">{otherUser.nickname[0]}</Avatar>}
          />

          <CardContent className={classes.content}>
            <Grid container>
              <Grid item xs={4}>
                <Typography className={classes.typography}>게시물</Typography>
                <Typography className={classes.typography}>{otherUser.Posts}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.typography}>팔로잉</Typography>
                <Typography className={classes.typography}>{otherUser.Followings}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.typography}>팔로워</Typography>
                <Typography className={classes.typography}>{otherUser.Followers}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.params.tag,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});

export default memo(Hashtag);
