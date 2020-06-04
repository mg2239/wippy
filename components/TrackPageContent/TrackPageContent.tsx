import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Blob from 'node-blob';
import { storage } from '../../utils/initFirebase';
import styles from './trackpagecontent.module.scss';

const Track = dynamic(() => import('../Track/Track'), { ssr: false });

type Props = {
  trackID: string
  src: string
}

function TrackPageContent({ trackID }: Props) {
  const [mp3, setMp3] = useState(new Blob());
  const [DNE, setDNE] = useState(false);

  useEffect(() => {
    storage.ref(`${trackID}.mp3`).getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            setMp3(blob);
          })
          .catch((err) => console.log(err));
      })
      .catch(() => {
        if (trackID !== undefined) {
          setDNE(true);
        }
      });
  }, [trackID]);

  return (
    <div id={styles.container}>
      {!DNE && <Track mp3={mp3} />}
      {DNE && <p>404!</p>}
    </div>
  );
}

export default TrackPageContent;
