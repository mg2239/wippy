import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from '../components/Page/Page';
import TrackPageContent from '../components/TrackPageContent/TrackPageContent';

export default function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const title = 'Example Title';
  return (
    <>
      <Head>
        <title>{`${title} - wippy`}</title>
      </Head>
      <Page>
        <TrackPageContent trackID={id as string} />
      </Page>
    </>
  );
}
