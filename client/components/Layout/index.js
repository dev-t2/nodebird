import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import { AppBar, Grid, InputBase, Toolbar, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import useStyles from './styles';

import UserProfile from '../UserProfile';
import LoginForm from '../LoginForm';
import useInput from '../../hooks/useInput';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const [searchInput, onChangeSearchInput] = useInput('');

  const classes = useStyles();

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();

      Router.push(`/hashtag/${searchInput}`);
    },
    [searchInput]
  );

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6">
                <Link href="/">
                  <a>dev.t2</a>
                </Link>
              </Typography>

              {user && (
                <Typography className={classes.profile}>
                  <Link href="/profile">
                    <a>프로필</a>
                  </Link>
                </Typography>
              )}

              <form className={classes.search} onSubmit={onSearch}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchInput}
                  onChange={onChangeSearchInput}
                />
              </form>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={3}>
          {user ? <UserProfile /> : <LoginForm />}
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(Layout);
