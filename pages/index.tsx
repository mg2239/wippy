import Head from 'next/head';
import React from 'react';

import Page from '@components/Page';
import Home from '@scenes/Home';

function HomePage() {
  return (
    <>
      <Head>
        <title>home - wippy</title>
      </Head>
      <Page>
        <Home />
      </Page>
    </>
  );
}

export default HomePage;
