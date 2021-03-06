import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import styles from './404.module.scss';
import Button from 'src/components/Button/Button';

export default function ErrorPage() {
  const { push } = useHistory();
  return (
    <>
      <Helmet>
        <title>404 - wippy</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.mainText}>404.</h1>
        <p className={styles.subText}>
          either the track has expired or does not exist
        </p>
        <Button onClick={() => push('/')}>return home</Button>
      </div>
    </>
  );
}
