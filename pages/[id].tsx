import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { TrackInfo } from '../components/TrackInfo';
import { Track } from '../types';
import { db, storage } from '../util/firebase';

const Player = dynamic(
  () => import('../components/Player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);

type Props = {
  track: Track;
};

const TrackPage = ({ track }: Props) => {
  return (
    <Page>
      <Head title={track.title} noIndex />
      <TrackInfo track={track} />
      <Player url={track.url} />
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const { id, uploaded } = query;

  const trackDoc = await getDoc(doc(db, 'tracks', id as string));

  if (!trackDoc.exists()) {
    return { notFound: true };
  }

  const track = trackDoc.data();
  const url = !uploaded
    ? await getDownloadURL(ref(storage, `${id}.${track.fileExt}`))
    : undefined;

  return {
    props: {
      track: {
        ...track,
        url,
      },
    },
  };
};

export default TrackPage;
