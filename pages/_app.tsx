import type { AppProps } from 'next/app';
import unmuteAudio from 'unmute-ios-audio';
import { UploadProvider } from '../context/UploadContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  unmuteAudio();
  return (
    <UploadProvider>
      <Component {...pageProps} />
    </UploadProvider>
  );
}
