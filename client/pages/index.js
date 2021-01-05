import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../_store/configureStore';

import { LOAD_MY_INFO_REQUEST } from '../_actionTypes/userInfo';
import { LOAD_POSTS_REQUEST } from '../_actionTypes/post';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { frontend } from '../config';

const Index = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    (state) => state.post
  );

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
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts]);

  return (
    <>
      <Head>
        <title>dev-t2</title>
        <meta name="description" content="개인 웹사이트 만들기 전에 테스트..." />

        <meta property="og:title" content="dev-t2" />
        <meta property="og:description" content="개인 웹사이트 만들기 전에 테스트..." />
        <meta property="og:image" content={`${frontend}/favicon.ico`} />
        <meta property="og:url" content={`${frontend}`} />
      </Head>

      {/* <h1>1월 중에 업데이트 완료 예정!! Coming Soon!</h1> */}

      <Layout>
        {user && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
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
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default memo(Index);
