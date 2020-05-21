import React, { useState } from 'react';
import Upload from '../Upload/Upload';
import LandingText from '../LandingText/LandingText';
import styles from './homepage.module.scss';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  function handleUpload() {
    setUploaded(true);
  }
  return (
    <div id={styles.home}>
      <div id={styles.homeInner}>
        {!uploaded && <LandingText />}
        <Upload onUpload={handleUpload} />
      </div>
    </div>
  );
}
