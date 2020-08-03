import Head from 'next/head';
import React from 'react';

import Page from '@components/Page';
import HomePageContent from '@scenes/Home';

function HomePage() {
  return (
    <>
      <Head>
        <title>home - wippy</title>
      </Head>
      <Page>
        <HomePageContent />
      </Page>
    </>
  );
}

export default HomePage;
