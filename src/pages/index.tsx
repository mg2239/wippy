import React from 'react';

import Page from 'src/components/Page';
import Home from 'src/scenes/Home';

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
