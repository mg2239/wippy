import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from '../components/Page/Page';
import TrackPageContent from '../components/TrackPageContent/TrackPageContent';
// import { storageAdmin } from '../utils/initFirebase';
// eslint-disable-next-line no-unused-vars

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
        <TrackPageContent trackID={id as string} src='src' />
      </Page>
    </>
  );
}

export default TrackPage;
