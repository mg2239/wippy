import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFile } from '../../utils/FileContext';
import Upload from '../Upload/Upload';
import styles from './homepagecontent.module.scss';

function LandingText() {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.main}>
        keep your unreleased and unfinished songs <b>safe</b>
      </p>
      <p id={styles.subtext}>
        <b>upload</b> and <b>share</b> audio quickly and securely with expiring links
      </p>
    </div>
  );
}

function HomePageContent() {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  const file = useFile();
  function handleUpload() {
    setUploaded(true);
  }
  function handleSuccess(mp3: File, id: string) {
    file.setMp3(mp3);
    router.push(`/${id}`);
  }
  return (
    <div id={styles.container}>
      <div id={styles.inner}>
        {!uploaded && <LandingText />}
        <Upload onUpload={handleUpload} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default HomePageContent;
