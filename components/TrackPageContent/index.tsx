import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Blob from 'node-blob';
import { storage } from '../../utils/initFirebase';
import { useFile } from '../../utils/FileContext';
import styles from './index.module.scss';

const Track = dynamic(() => import('../Track'), { ssr: false });

type Props = {
  trackID: string;
  src: string;
};

function TrackPageContent({ trackID }: Props) {
  const [mp3, setMp3] = useState(new Blob());
  const [DNE, setDNE] = useState(false);
  const file = useFile();

  const getMp3 = () => {
    storage
      .ref(`${trackID}.mp3`)
      .getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => setMp3(blob))
          .catch((err) => console.log(err));
      })
      .catch(() => setDNE(true));
  };

  useEffect(() => {
    console.log(file);
    const contextMp3 = file.mp3;
    if (trackID && contextMp3 && contextMp3.name === `${trackID}.mp3`) {
      setMp3(contextMp3);
    } else if (trackID) {
      getMp3();
    }
  }, [trackID]);

  return (
    <div id={styles.container}>
      {!DNE && <Track mp3={mp3} />}
      {DNE && <p>404!</p>}
    </div>
  );
}

export default TrackPageContent;
