import React from 'react';

import { useTrack } from '../../index.state';
import Player from '../Player';
import TrackEdit from '../TrackEdit';
import TrackInfo from '../TrackInfo';
import styles from './index.module.scss';
import { useMP3 } from 'src/context/mp3';

export default function Content() {
  const { theme } = useTrack();
  const { isNew } = useMP3();

  console.log(isNew);

  return (
    <div className={styles.container}>
      <TrackEdit />
      <Player theme={theme} />
      <TrackInfo />
    </div>
  );
}
