import { AppProps } from 'next/app';
import React from 'react';

import { FileProvider } from '@util/FileContext';
import '@styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <FileProvider>
      <Component {...pageProps} />
    </FileProvider>
  );
}
