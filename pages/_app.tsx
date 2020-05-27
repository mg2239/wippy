import React from 'react';
// eslint-disable-next-line no-unused-vars
import { AppProps } from 'next/app';
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
