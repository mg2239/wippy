import React from 'react';
// eslint-disable-next-line no-unused-vars
import App, { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { initializeStore } from '../utils/FileStore';
import '../public/index.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { fileStore } = pageProps.initialStoreState;
  return (
    <Provider fileStore={fileStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getStaticProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const initialStoreState = initializeStore();
  return {
    ...appProps,
    initialStoreState,
  };
};

MyApp.getDerivedStateFromProps = (props: any, state: any) => {
  state.fileStore.hydrate(props.initialStoreState);
  return state;
};
