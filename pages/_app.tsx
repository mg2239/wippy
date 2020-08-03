import { AppProps } from 'next/app';
import React from 'react';

import { FileProvider } from '@util/FileContext';
import { ScreenProvider } from '@util/ScreenContext';
import '@styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <FileProvider>
      <ScreenProvider>
        <Component {...pageProps} />
      </ScreenProvider>
    </FileProvider>
  );
}
