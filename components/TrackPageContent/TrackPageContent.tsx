import React, { useEffect, useState } from 'react';
import { storage } from '../../utils/initFirebase';
import Track from '../Track/Track';
import styles from './trackpagecontent.module.scss';

type Props = {
  trackID: string
  src: string
}

function TrackPageContent({ trackID }: Props) {
  const [mp3, setMp3] = useState(new Blob());
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
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id={styles.container}>
      {mp3.size !== 0 && <Track mp3={mp3} />}
    </div>
  );
}

export default TrackPageContent;
