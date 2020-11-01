import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import useStyles from './styles';

import useInput from '../../hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../_actionTypes/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput('');

  const classes = useStyles();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }

      const formData = new FormData();

      imagePaths.forEach((path) => {
        formData.append('images', path);
      });
      formData.append('content', text);

      return dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [imagePaths, text]
  );

  const onChange = useCallback((e) => {
    const imagesFormData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      imagesFormData.append('images', file);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imagesFormData,
    });
  }, []);

  const onClick = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined" square>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            fullWidth
            placeholder="어떤 신기한 일이 있었나요?"
            value={text}
            onChange={onChangeText}
          />

          <div className={classes.div}>
            <label htmlFor="contained-button-file">
              <input
                className={classes.input}
                id="contained-button-file"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
              />
              <IconButton
                className={classes.icon}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>

            <Button type="submit" variant="contained" size="small" color="primary">
              게시
            </Button>
          </div>

          <Grid container className={classes.container} spacing={3}>
            {imagePaths.map((path, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card key={path} className={classes.imagePath} variant="outlined">
                  <CardMedia
                    component="img"
                    alt={path}
                    height="200"
                    image={`http://localhost:3065/${path}`}
                    title={path}
                  />

                  <CardActions className={classes.action}>
                    <Button size="small" color="secondary" onClick={onClick(index)}>
                      삭제
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default memo(PostForm);
