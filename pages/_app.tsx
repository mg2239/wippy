import { AppProps } from 'next/app';
import React from 'react';

import { ScreenProvider } from '@util/ScreenContext';
import '@styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ScreenProvider>
      <Component {...pageProps} />
    </ScreenProvider>
  );
}
