import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Upload from '../Upload/Upload';
import LandingText from '../LandingText/LandingText';
import styles from './homepagecontent.module.scss';

function HomePageContent() {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  function handleUpload() {
    setUploaded(true);
  }
  function handleSuccess(mp3: File, id: string) {
    console.log(mp3);
    router.push(`/${id}`);
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

export default HomePageContent;
