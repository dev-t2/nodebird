import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  FavoriteBorderOutlined,
  FavoriteTwoTone,
  Message,
  MessageOutlined,
  RepeatOutlined,
} from '@material-ui/icons';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
} from '../_actionTypes/post';

import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostContent from './PostContent';
import Follow from './Follow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    flexGrow: 1,
    margin: theme.spacing(2),
    maxWidth: '960px',
  },
  retweet: {
    padding: theme.spacing(1),
  },
  postContent: {
    padding: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(0, 1),
  },
}));

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userInfo.user?.id);

  const liked = post.Likers.find((v) => v.id === id);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const classes = useStyles();

  const onChangePost = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelPost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onClickDelete = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickLiked = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickUnLiked = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickCommentFormOpened = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return setCommentFormOpened((prevLiked) => !prevLiked);
  }, []);

  const onUpdatePost = useCallback(
    (text) => () => {
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }

      return dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: text,
        },
      });
    },
    [post]
  );

  return (
    <div className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={
            <Link href={`/user/${post.User.id}`} prefetch={false}>
              <a>
                <Avatar aria-label="avatar">{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={
            post.RetweetId && post.Retweet
              ? `${post.User.nickname}님이 리트윗하셨습니다.`
              : `${post.User.nickname}`
          }
          subheader={moment(post.createdAt).format('YYYY.MM.DD')}
          action={
            id && post.User.id === id ? (
              <>
                {post.RetweetId || editMode ? null : (
                  <Button color="primary" onClick={onChangePost}>
                    수정
                  </Button>
                )}
                <Button color="secondary" onClick={onClickDelete}>
                  삭제
                </Button>
              </>
            ) : (
              <>
                {id && <Follow post={post} />}
                {/* <Button color="secondary">신고</Button> */}
              </>
            )
          }
        />

        {post.Images[0] && <PostImages images={post.Images} />}

        <CardContent variant="body2" color="textSecondary">
          {post.RetweetId && post.Retweet ? (
            <Card className={classes.retweet} variant="outlined">
              <CardHeader
                avatar={
                  <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <a>
                      <Avatar aria-label="avatar">{post.Retweet.User.nickname[0]}</Avatar>
                    </a>
                  </Link>
                }
                title={post.Retweet.User.nickname}
                subheader={moment(post.Retweet.createdAt).format('YYYY.MM.DD')}
              />

              {post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
              <div className={classes.postContent}>
                <PostContent postData={post.Retweet.content} />
              </div>
            </Card>
          ) : (
            <PostContent
              postData={post.content}
              editMode={editMode}
              onUpdatePost={onUpdatePost}
              onCancelPost={onCancelPost}
            />
          )}
        </CardContent>

        <CardActions className={classes.actions}>
          <IconButton aria-label="retweet" onClick={onClickRetweet}>
            <RepeatOutlined />
          </IconButton>

          {liked ? (
            <IconButton aria-label="heart" onClick={onClickUnLiked}>
              <FavoriteTwoTone color="secondary" />
            </IconButton>
          ) : (
            <IconButton aria-label="heart" onClick={onClickLiked}>
              <FavoriteBorderOutlined />
            </IconButton>
          )}

          <IconButton aria-label="comment" onClick={onClickCommentFormOpened}>
            {commentFormOpened ? <Message color="primary" /> : <MessageOutlined />}
          </IconButton>
        </CardActions>

        <Collapse in={commentFormOpened} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentForm post={post} />

            <Typography>{`${post.Comments.length} 개의 댓글`}</Typography>
            <List dense>
              {post.Comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemAvatar>
                    <Link href={`/user/${comment.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{comment.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.User.nickname}
                    secondary={
                      <Typography component="span" variant="body2" color="textPrimary">
                        {comment.content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default memo(PostCard);
