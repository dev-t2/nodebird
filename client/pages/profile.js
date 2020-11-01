import { memo, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../_actionTypes/userInfo';
import wrapper from '../_store/configureStore';
import { backend } from '../config';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const [followersLimit, setFollowersLimit] = useState(10);
  const [followingsLimit, setFollowingsLimit] = useState(10);

  const { data: followersData, error: followerError } = useSWR(
    `${backend}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backend}/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!(user && user.id)) {
      Router.replace('/');
    }
  }, [user, user?.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 10);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 10);
  }, []);

  console.log(followersData, followingsData);

  if (!user) return '로딩 중...';

  if (followerError || followingError) {
    console.error(followerError || followingError);

    return '로딩 중 에러가 발생했습니다!!';
  }

  return (
    <>
      <Head>
        <title>Nodebird 프로필</title>
      </Head>

      <Layout>
        <NicknameEditForm />

        <Grid container>
          <Grid item xs={12} sm={6}>
            <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});

export default memo(Profile);
