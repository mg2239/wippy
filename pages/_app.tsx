import { AppProps } from 'next/app';
import React from 'react';

import { ScreenProvider } from '@context/screen';
import { UploadProvider } from '@context/upload';
import '@styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <UploadProvider>
      <ScreenProvider>
        <Component {...pageProps} />
      </ScreenProvider>
    </UploadProvider>
  );
}
