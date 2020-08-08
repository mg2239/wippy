import React from 'react';

import { useTrack } from '../../index.state';
import Player from '../Player';
import TrackEdit from '../TrackEdit';
import TrackInfo from '../TrackInfo';
import styles from './index.module.scss';
import { useUpload } from 'src/context/upload';

type ContentProps = {
  mp3: File | undefined;
};

export default function Content({ mp3 }: ContentProps) {
  const { bgColor } = useTrack();
  const { isNew } = useUpload();

  return (
    <div className={styles.container}>
      {isNew && <TrackEdit />}
      <Player mp3={mp3} bgColor={bgColor} />
      <TrackInfo />
    </div>
  );
}
