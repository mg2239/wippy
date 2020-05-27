import React, { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './track.module.scss';

type Props = {
  blob: Blob
}

function Track({ blob }: Props) {
  let wavesurfer: WaveSurfer;
  useEffect(() => {
    if (blob.size !== 0) {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#FFFFFFBB',
        progressColor: 'white',
        responsive: true,
        barGap: 2,
        barMinHeight: 1,
        barWidth: 2,
        barRadius: 1,
        cursorWidth: 0,
        height: 150,
      });
      wavesurfer.loadBlob(blob);
    }
  }, [blob]);


  function playPause() {
    wavesurfer.playPause();
  }

  return (
    <div id={styles.track}>
      <button onClick={() => playPause()}>play/pause</button>
      <div id='waveform' className={styles.waveform} />
    </div>
  );
}

export default Track;