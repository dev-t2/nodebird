import { memo, useEffect } from 'react';
import Link from 'next/link';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrap: {
    flexGrow: 1,
    maxWidth: '960px',
  },
  div: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  typography: {
    '& a': {
      color: '#3f51b5',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const PostContent = ({ postData, editMode, onUpdatePost, onCancelPost }) => {
  const { updatePostDone } = useSelector((state) => state.post);
  const [text, onChangeText] = useInput(postData);

  const classes = useStyles();

  useEffect(() => {
    if (updatePostDone && onCancelPost) {
      onCancelPost();
    }
  }, [updatePostDone]);

  return (
    <>
      {editMode ? (
        <div className={classes.root}>
          <div className={classes.wrap}>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              fullWidth
              value={text}
              onChange={onChangeText}
            />

            <div className={classes.div}>
              <Button type="submit" size="small" color="primary" onClick={onUpdatePost(text)}>
                수정
              </Button>
              <Button type="submit" size="small" color="secondary" onClick={onCancelPost}>
                취소
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Typography className={classes.typography}>
          {postData.split(/(#[^\s#]+)/g).map((data, index) => {
            if (data.match(/(#[^\s#]+)/)) {
              return (
                <Link
                  key={index}
                  className={classes.link}
                  color="primary"
                  prefetch={false}
                  href={`/hashtag/${data.slice(1)}`}
                >
                  <a>{data}</a>
                </Link>
              );
            }
            return data;
          })}
        </Typography>
      )}
    </>
  );
};

export default memo(PostContent);
