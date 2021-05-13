import React from 'react';

import { useTrack } from '../../track.state';
import { getDifferenceFromNow } from '../../track.util';
import styles from './trackinfo.module.scss';

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
