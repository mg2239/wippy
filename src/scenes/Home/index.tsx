import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Upload from './components/Upload';
import styles from './index.module.scss';
import Page from 'src/components/Page';
import { useMP3 } from 'src/context/mp3';

function LandingText() {
  return (
    <div className={styles.textWrapper}>
      <p className={styles.mainText}>
        keep your unreleased and unfinished songs <b>safe</b>
      </p>
      <p className={styles.subText}>
        <b>upload</b> and <b>share</b> audio quickly and securely with expiring
        links
      </p>
    </div>
  );
}

export default function HomePage() {
  const [uploaded, setUploaded] = useState(false);
  const { setIsNew } = useMP3();
  const { push } = useHistory();

  const onUpload = () => setUploaded(true);

  const onSuccess = (id: string) => {
    setIsNew(true);
    push(`/${id}`);
  };

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.inner}>
          {!uploaded && <LandingText />}
          <Upload onUpload={onUpload} onSuccess={onSuccess} />
        </div>
      </div>
    </Page>
  );
}
