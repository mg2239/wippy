import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './track.module.scss';

type Props = {
  mp3: Blob
}

function Track({ mp3 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [duration, setDuration] = useState('');
  let wavesurfer: WaveSurfer;

  function formatSeconds(time: number) {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
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
    wavesurfer.loadBlob(mp3);
    wavesurfer.on('ready', () => {
      setLoaded(true);
      setCurrentTime('0:00');
      setDuration(formatSeconds(wavesurfer.getDuration()));
      wavesurfer.play();
    });
    wavesurfer.on('audioprocess', () => {
      const current = formatSeconds(wavesurfer.getCurrentTime());
      setCurrentTime(current);
    });
  }, []);

  return (
    <div id={styles.track}>
      {loaded && <button onClick={() => wavesurfer.playPause()}>play/pause</button>}
      <div id='waveform' className={styles.waveform} />
      <p>{`${currentTime} / ${duration}`}</p>
    </div>
  );
}

export default Track;
