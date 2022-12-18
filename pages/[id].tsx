import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { Track } from '../types';
import { db, storage } from '../util/firebase';

const Player = dynamic(
  () => import('../components/Player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);

type Props = {
  id: string;
  track: Track;
};

const TrackPage = ({ id, track }: Props) => {
  return (
    <Page>
      <Head title={track.title} />
      <h1 className="mb-4 text-4xl font-semibold">{track.title}</h1>
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
      id,
      track: {
        ...track,
        url,
      },
    },
  };
};

export default TrackPage;
