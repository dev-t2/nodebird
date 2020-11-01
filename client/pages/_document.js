import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';

export default class RootDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
          {flush() || null}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
