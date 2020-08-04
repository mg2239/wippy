import dynamic from 'next/dynamic';
import React from 'react';

import styles from './index.module.scss';
import { useTrack } from './index.state';
import { useUpload } from '@context/upload/index';

const Player = dynamic(() => import('./components/Player'), { ssr: false });

type Props = {
  mp3: File;
};

export default function Track({ mp3 }: Props) {
  const { bgColor } = useTrack();
  const { isNew } = useUpload();

  console.log(isNew);

  return (
    <div id={styles.container}>
      <Player mp3={mp3} bgColor={bgColor} />
    </div>
  );
}
