import React, { useState } from 'react';

import { useFile } from '../../util/FileContext';
import Upload from './components/Upload';
import styles from './index.module.scss';

function LandingText() {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.main}>
        keep your unreleased and unfinished songs <b>safe</b>
      </p>
      <p id={styles.subtext}>
        <b>upload</b> and <b>share</b> audio quickly and securely with expiring
        links
      </p>
    </div>
  );
}

export default function HomePageContent() {
  const [uploaded, setUploaded] = useState(false);
  const { setMp3 } = useFile();

  const handleUpload = () => setUploaded(true);

  const handleSuccess = (mp3: File, id: string) => {
    console.log(id);
    console.log(mp3);
    setMp3(mp3);
  };

  return (
    <div id={styles.container}>
      <div id={styles.inner}>
        {!uploaded && <LandingText />}
        <Upload onUpload={handleUpload} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
