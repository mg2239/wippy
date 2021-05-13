import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Upload from './components/Upload/Upload';
import styles from './home.module.scss';
import Page from 'src/components/Page/Page';

function LandingText() {
  return (
    <div className={styles.textContainer}>
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
  const { push } = useHistory();

  const onUpload = () => setUploaded(true);

  const onSuccess = (id: string) => push(`/${id}`);

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
