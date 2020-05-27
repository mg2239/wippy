import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Page from '../components/Page/Page';
// import { storageAdmin } from '../utils/initFirebase';
// eslint-disable-next-line no-unused-vars
import { FileStore } from '../utils/FileStore';

const TrackPageContent = dynamic(() => import('../components/TrackPageContent/TrackPageContent'), { ssr: false });

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
