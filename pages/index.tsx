import Head from 'next/head';
import React from 'react';

import Page from '@components/Page';
import Home from '@scenes/Home';

function HomePage() {
  return (
    <>
      <Head>
        <title>wippy</title>
      </Head>
      <Page>
        <Home />
      </Page>
    </>
  );
}

export default HomePage;
