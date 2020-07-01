import React from 'react';
import { AppProps } from 'next/app';
import { FileProvider } from '../utils/FileContext';
import '../public/index.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <FileProvider>
      <Component {...pageProps} />
    </FileProvider>
  );
}

export default CustomApp;
