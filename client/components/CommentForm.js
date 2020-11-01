import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, makeStyles, Paper, TextField } from '@material-ui/core';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../_actionTypes/post';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    padding: theme.spacing(0, 2),
  },
  div: {
    margin: theme.spacing(0, 2, 1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userInfo.user?.id);
  const { addCommentDone } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const classes = useStyles();

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, postId: post.id, userId: id },
      });
    },
    [post.id, commentText]
  );

  return (
    <>
      <Paper className={classes.root} variant="outlined" square>
        <form onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            multiline
            rows={2}
            fullWidth
            placeholder="댓글을 입력하세요."
            value={commentText}
            onChange={onChangeCommentText}
          />

          <div className={classes.div}>
            <Button type="submit" variant="contained" size="small" color="primary">
              댓글 달기
            </Button>
          </div>
        </form>
      </Paper>

      <Divider className={classes.divider} />
    </>
  );
};

export default memo(CommentForm);
