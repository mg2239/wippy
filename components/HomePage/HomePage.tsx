import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import Upload from '../Upload/Upload';
import LandingText from '../LandingText/LandingText';
import styles from './homepage.module.scss';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  function handleUpload() {
    setUploaded(true);
  }
  function handleSuccess(filename: string) {
    console.log(filename);
    router.push(`/${uuid()}`);
  }
  return (
    <div id={styles.home}>
      <div id={styles.homeInner}>
        {!uploaded && <LandingText />}
        <Upload
          acceptedFiles={['.mp3', '.wav', '.flac']}
          onUpload={handleUpload}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
