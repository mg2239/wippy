import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';
import Button from 'src/components/Button/index';

export default function ErrorPage() {
  const { push } = useHistory();
  return (
    <div className={styles.container}>
      <h1 className={styles.mainText}>404.</h1>
      <p className={styles.subText}>
        either the track has expired or does not exist
      </p>
      <Button onClick={() => push('/')}>return home</Button>
    </div>
  );
}
