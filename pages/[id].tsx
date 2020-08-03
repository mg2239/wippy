import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Page from '@components/Page';
import TrackPageContent from '@scenes/Track';

function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const title = 'Example Title';
  return (
    <>
      <Head>
        <title>{`${title} - wippy`}</title>
      </Head>
      <Page>
        <TrackPageContent trackID={id as string} src="src" />
      </Page>
    </>
  );
}

export default TrackPage;
