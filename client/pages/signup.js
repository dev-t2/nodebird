import { memo, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';

import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../_store/configureStore';

import Layout from '../components/Layout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGNUP_REQUEST } from '../_actionTypes/userInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(2),
    maxWidth: '960px',
  },
  container: {
    padding: theme.spacing(1, 2),
  },
  item: {
    padding: theme.spacing(1, 2),
  },
}));

const Signup = () => {
  const dispatch = useDispatch();
  const { user, signupDone, signupError } = useSelector((state) => state.userInfo);

  const [email, setEmail] = useState('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (user && user.id) {
      Router.replace('/');
    }
  }, [user, user?.id]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(password !== e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (/\S+@\S+\.\S+/g.test(email)) {
        if (password !== passwordCheck) {
          return setPasswordError(true);
        }

        if (!term) {
          return setTermError(true);
        }

        return dispatch({
          type: SIGNUP_REQUEST,
          data: { email, password, nickname },
        });
      }

      return setEmailError(true);
    },
    [email, password, passwordCheck, nickname, term]
  );

  const onChangeEmail = useCallback((e) => {
    const email = e.target.value;

    setEmail(email);

    if (/\S+@\S+\.\S+/g.test(email)) {
      setEmailError(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Nodebird 회원가입</title>
      </Head>

      <Layout>
        <div className={classes.root}>
          <Paper className={classes.paper} variant="outlined" square>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <Grid container className={classes.container}>
                <Grid item className={classes.item} xs={12} sm={6}>
                  <TextField
                    label="이메일"
                    type="email"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    error={emailError}
                    helperText={emailError ? '이메일을 올바르게 입력하세요.' : ''}
                    value={email}
                    onChange={onChangeEmail}
                  />
                </Grid>
                <Grid item className={classes.item} xs={12} sm={6}>
                  <TextField
                    label="닉네임"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    value={nickname}
                    onChange={onChangeNickname}
                  />
                </Grid>
                <Grid item className={classes.item} xs={12} sm={6}>
                  <TextField
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    autoComplete="current-password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </Grid>
                <Grid item className={classes.item} xs={12} sm={6}>
                  <TextField
                    label="비밀번호 확인"
                    type="password"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError ? '비밀번호가 일치하지 않습니다.' : ''}
                    value={passwordCheck}
                    onChange={onChangePasswordCheck}
                  />
                </Grid>
                <Grid item className={classes.item} xs={12}>
                  <FormControl error={termError}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox checked={term} onChange={onChangeTerm} color="primary" />
                        }
                        label="만든 사람의 말을 잘 들을 것을 동의합니다."
                      />
                    </FormGroup>
                    {termError && <FormHelperText>약관에 동의하셔야 합니다.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item className={classes.item} xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    가입하기
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
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

export default memo(Signup);
