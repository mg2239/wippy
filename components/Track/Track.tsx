import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './track.module.scss';

type Props = {
  mp3: Blob
}

function Track(this: any, { mp3 }: Props) {
  const [wavesurfer, setWavesurfer] = useState(undefined as any as WaveSurfer);
  const [currentTime, setCurrentTime] = useState('');
  const [duration, setDuration] = useState('');

  function formatSeconds(time: number) {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function updateCurrentTime(wave: WaveSurfer) {
    const current = formatSeconds(wave.getCurrentTime());
    setCurrentTime(current);
  }

  useEffect(() => {
    const wave = WaveSurfer.create({
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
      hideScrollbar: true,
    });
    wave.loadBlob(mp3);
    wave.on('ready', () => {
      setCurrentTime('0:00');
      setDuration(formatSeconds(wave.getDuration()));
    });
    wave.on('audioprocess', () => {
      updateCurrentTime(wave);
    });
    wave.on('interaction', () => {
      updateCurrentTime(wave);
    });
    setWavesurfer(wave);
  }, []);

  return (
    <div id={styles.track}>
      <div id={styles.playContainer}>
        <button id={styles.playButton} onClick={() => wavesurfer.playPause()}>play/pause</button>
      </div>
      <div id='waveform' className={styles.waveform} />
      <div id={styles.progressContainer}>
        <p id={styles.progressTime}>{`${currentTime} / ${duration}`}</p>
      </div>
    </div>
  );
}

export default Track;
