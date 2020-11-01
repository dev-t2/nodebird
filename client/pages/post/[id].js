import { memo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import axios from 'axios';

import wrapper from '../../_store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../_actionTypes/userInfo';
import { LOAD_POST_REQUEST } from '../../_actionTypes/post';

import PostCard from '../../components/PostCard';
import Layout from '../../components/Layout';

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);

  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname} 님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : 'http://dev-t2.com/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://dev-t2.com/post/${id}`} />

        <title>{singlePost.User.nickname} 게시글</title>
      </Head>

      <PostCard post={singlePost} />
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
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});

export default memo(Post);
