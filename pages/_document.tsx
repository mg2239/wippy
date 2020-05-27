/* eslint-disable class-methods-use-this */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
