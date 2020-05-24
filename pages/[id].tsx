import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Page from '../components/Page/Page';
// import { storageAdmin } from '../utils/initFirebase';
import TrackPageContent from '../components/TrackPageContent/TrackPageContent';
// eslint-disable-next-line no-unused-vars
import { FileStore } from '../utils/FileStore';

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

// export async function getServerSideProps({ params }: any) {
//   const { id } = params;
//   const fileLocation = storageAdmin.bucket().file(`${id}.mp3`);
//   const res = await fileLocation.get();
//   const mp3 = res[0];
//   return {
//     src: URL.createObjectURL(mp3),
//   };
// }

export default TrackPage;
