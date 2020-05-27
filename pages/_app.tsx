import React from 'react';
// eslint-disable-next-line no-unused-vars
import App, { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { initializeStore } from '../utils/FileStore';
import '../public/index.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

// MyApp.getStaticProps = async (appContext: any) => {
//   const appProps = await App.getInitialProps(appContext);
//   const initialStoreState = initializeStore();
//   return {
//     ...appProps,
//     initialStoreState,
//   };
// };

// MyApp.getDerivedStateFromProps = (props: any, state: any) => {
//   state.fileStore.hydrate(props.initialStoreState);
//   return state;
// };

export default CustomApp;
