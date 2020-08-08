import React from 'react';

import { useTrack } from '../../index.state';
import { getDifferenceFromNow } from '../../index.util';
import styles from './index.module.scss';

export default function TrackInfo() {
  const { title, expiresAt } = useTrack();
  const expiresIn = getDifferenceFromNow(expiresAt);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {expiresAt !== '' && (
        <p className={styles.expires}>{`expires ${expiresIn}`}</p>
      )}
    </div>
  );
}
