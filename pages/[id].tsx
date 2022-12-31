import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import spacetime from 'spacetime';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { TrackInfo } from '../components/TrackInfo';
import { Track } from '../types';
import { db } from '../util/firebase';

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

type TrackData = Omit<Track, 'createdAt' | 'expiresAt'> & {
  createdAt: Timestamp;
  expiresAt: Timestamp;
};

export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const { id, uploaded } = query;

  const trackDoc = await getDoc(doc(db, 'tracks', id as string));

  if (!trackDoc.exists()) {
    return { notFound: true };
  }

  const trackData = trackDoc.data() as TrackData;

  if (spacetime.now().isAfter(trackData.expiresAt.toDate())) {
    return { notFound: true };
  }

  const track = {
    ...trackData,
    ...(uploaded && { url: undefined }),
    createdAt: trackData.createdAt.toMillis(),
    expiresAt: trackData.expiresAt.toMillis(),
  };

  return {
    props: {
      track,
    },
  };
};

export default TrackPage;
