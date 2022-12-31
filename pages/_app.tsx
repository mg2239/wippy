import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import unmuteAudio from 'unmute-ios-audio';
import { UploadProvider } from '../context/UploadContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    unmuteAudio();
  }, []);

  return (
    <UploadProvider>
      <Component {...pageProps} />
    </UploadProvider>
  );
}
