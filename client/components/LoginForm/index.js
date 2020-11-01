import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Button, Paper, TextField } from '@material-ui/core';
import useStyles from './styles';

import { loginRequestAction } from '../../_reducers/userInfo';
import useInput from '../../hooks/useInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginError } = useSelector((state) => state.userInfo);

  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useInput('');

  const [emailError, setEmailError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (/\S+@\S+\.\S+/g.test(email)) {
        return dispatch(loginRequestAction({ email, password }));
      }

      return setEmailError(true);
    },
    [email, password]
  );

  const onChangeEmail = useCallback((e) => {
    const email = e.target.value;

    setEmail(email);

    if (/\S+@\S+\.\S+/g.test(email)) {
      setEmailError(false);
    }
  }, []);

  return (
    <Paper className={classes.root} variant="outlined" square>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          label="이메일"
          type="email"
          variant="outlined"
          size="small"
          margin="normal"
          error={emailError}
          helperText={emailError ? '이메일을 올바르게 입력하세요.' : ''}
          value={email}
          onChange={onChangeEmail}
        />

        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          size="small"
          margin="normal"
          autoComplete="current-password"
          value={password}
          onChange={onChangePassword}
        />

        <div className={classes.div}>
          <Button className={classes.button}>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Button>
          <Button className={classes.button} type="submit" variant="contained" color="primary">
            로그인
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default memo(LoginForm);
