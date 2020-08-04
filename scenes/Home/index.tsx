import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Upload from './components/Upload';
import styles from './index.module.scss';
import { useUpload } from '@context/upload';

function LandingText() {
  return (
    <div id={styles.textWrapper}>
      <p id={styles.mainText}>
        keep your unreleased and unfinished songs <b>safe</b>
      </p>
      <p id={styles.subText}>
        <b>upload</b> and <b>share</b> audio quickly and securely with expiring
        links
      </p>
    </div>
  );
}

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const { setIsNew } = useUpload();
  const router = useRouter();

  const handleUpload = () => setUploaded(true);

  const handleSuccess = (id: string) => {
    setIsNew(true);
    router.push(`/${id}`);
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
