import { doc, getDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Head } from '../components/Head';
import { Page } from '../components/Page';
import { UploadContext } from '../context/UploadContext';
import { Track } from '../types';
import { db } from '../util/firebase';

type Props = {
  id: string;
  track?: Track;
};

const TrackPage = ({ id, track: _track }: Props) => {
  const context = useContext(UploadContext);
  const [track, setTrack] = useState(_track);

  const file = track?.file || context.file!;

  const getFilename = () => {
    const [name] = file.name.split('.');
    return name;
  };

  return (
    <Page>
      <Head title={track ? track.title : getFilename()} />
      <audio controls src={URL.createObjectURL(file)} />
    </Page>
  );
};

export const getServerSideProps = async ({
  query,
}: {
  query: Record<string, any>;
}) => {
  const { id, uploaded } = query;

  if (uploaded) {
    return { props: { id } };
  }

  const docRef = doc(db, 'tracks', id);
  const trackDoc = await getDoc(docRef);

  let track = null;

  if (trackDoc.exists()) {
    track = trackDoc.data();
  }

  return { props: { id, track } };
};

export default TrackPage;
