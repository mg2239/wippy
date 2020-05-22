import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import Upload from '../Upload/Upload';
import LandingText from '../LandingText/LandingText';
import styles from './homepagecontent.module.scss';

export default function HomePageContent() {
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
        <Upload onUpload={handleUpload} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
