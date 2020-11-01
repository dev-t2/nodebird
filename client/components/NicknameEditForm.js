import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, makeStyles, Paper, TextField } from '@material-ui/core';

import { CHANGE_NICKNAME_REQUEST } from '../_actionTypes/userInfo';
import useInput from '../hooks/useInput';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-end',
  },
  textField: {
    flex: 1,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 2),
  },
}));

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  const [nickname, onChangeNickname] = useInput(user.nickname);

  const classes = useStyles();

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  });

  return (
    <Paper className={classes.root} variant="outlined" square>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          className={classes.textField}
          label="닉네임"
          size="small"
          margin="normal"
          variant="outlined"
          value={nickname}
          onChange={onChangeNickname}
        />
        <Button
          className={classes.button}
          variant="contained"
          type="submit"
          size="large"
          color="primary"
        >
          수정
        </Button>
      </form>
    </Paper>
  );
};

export default memo(NicknameEditForm);
