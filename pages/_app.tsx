import type { AppProps } from 'next/app';
import { UploadProvider } from '../context/UploadContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UploadProvider>
      <Component {...pageProps} />
    </UploadProvider>
  );
}
