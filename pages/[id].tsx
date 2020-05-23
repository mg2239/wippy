import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useStore } from 'react-stores';
import { fileStore } from '../HomePageContent/HomePageContent';
import Page from '../components/Page/Page';
import { storageAdmin } from '../../utils/initFirebase';
import TrackPageContent from '../components/TrackPageContent/TrackPageContent';

export default function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const title = 'Example Title';
  const [src, setSrc] = useState('');
  const storeState = useStore(fileStore);
  const { mp3 } = storeState;
  if (mp3) {
    setSrc(URL.createObjectURL(mp3));
  } else {
    storage.ref().child(`${trackID}.mp3`).getDownloadURL()
      .then((url: string) => {
        fetch(`https://corsanywhere.herokuapp.com/${url}`)
          .then((res) => res.blob())
          .then((blob) => {
            setSrc(URL.createObjectURL(blob));
          });
      });
  }
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

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
