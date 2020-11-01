import App from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';

import wrapper from '../_store/configureStore';

class RootApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component } = this.props;

    return (
      <>
        <CssBaseline />
        <Component />
      </>
    );
  }
}

export default wrapper.withRedux(RootApp);
