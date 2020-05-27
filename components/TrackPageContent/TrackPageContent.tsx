import React, { useEffect, useState } from 'react';
import { storage } from '../../utils/initFirebase';
import Track from '../Track/Track';

type Props = {
  trackID: string
  src: string
}

function TrackPageContent({ trackID }: Props) {
  const [blob, setBlob] = useState(new Blob());
  useEffect(() => {
    storage.ref(`${trackID}.mp3`).getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((res) => res.blob())
          .then((mp3Blob) => {
            setBlob(mp3Blob);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      <Track blob={blob} />

    </div>
  );
}

export default TrackPageContent;
