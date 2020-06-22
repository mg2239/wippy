import React, { useState } from 'react';
import { AppProps } from 'next/app';
import FileContext from '../utils/FileContext';
import '../public/index.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  const [mp3, setMP3] = useState(undefined as unknown as File);
  return (
    <FileContext.Provider value={{ mp3, setMP3 }}>
      <Component {...pageProps} />
    </FileContext.Provider>
  );
}

export default CustomApp;
