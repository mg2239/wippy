import React from 'react';

import { useTrack } from '../../index.state';
import Player from '../Player';
import TrackEdit from '../TrackEdit';
import TrackInfo from '../TrackInfo';
import styles from './index.module.scss';
import { useMP3 } from 'src/context/mp3';

type ContentProps = {
  mp3: File | undefined;
};

export default function Content({ mp3 }: ContentProps) {
  const { bgColor } = useTrack();
  const { isNew } = useMP3();

  return (
    <div className={styles.container}>
      {isNew && <TrackEdit />}
      <Player mp3={mp3} bgColor={bgColor} />
      <TrackInfo />
    </div>
  );
}
