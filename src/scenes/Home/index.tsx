import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Upload from './components/Upload';
import styles from './index.module.scss';
import Page from 'src/components/Page';
import { useUpload } from 'src/context/upload';

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

export default function HomePage() {
  const [uploaded, setUploaded] = useState(false);
  const { setIsNew } = useUpload();
  const { push } = useHistory();

  const handleUpload = () => setUploaded(true);

  const handleSuccess = (id: string) => {
    setIsNew(true);
    push(`/${id}`);
  };

  return (
    <Page>
      <div id={styles.container}>
        <div id={styles.inner}>
          {!uploaded && <LandingText />}
          <Upload onUpload={handleUpload} onSuccess={handleSuccess} />
        </div>
      </div>
    </Page>
  );
}
