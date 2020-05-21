import React from 'react';
// eslint-disable-next-line no-unused-vars
import { AppProps } from 'next/app';
import '../public/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
