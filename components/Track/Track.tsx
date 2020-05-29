import React, { useState, useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import WaveSurfer from 'wavesurfer.js';
import play from './play.svg';
import pause from './pause.svg';
import styles from './track.module.scss';

type PlayProps = {
  onClick: () => void
  isPlaying: boolean
}

function PlayButton({ onClick, isPlaying }: PlayProps) {
  return (
    <div id={styles.playButton} onClick={onClick}>
      {!isPlaying && <img id={styles.icon} src={play} />}
      {isPlaying && <img id={styles.icon} src={pause} />}
    </div>
  );
}

type ProgressProps = {
  currentTime: string
}

function Progress({ currentTime }: ProgressProps) {
  return (
    <div id={styles.progressWrapper}>
      <p id={styles.progressTime}>{currentTime}</p>
    </div>
  );
}

type VolumeProps = {
  onChange: (volume: string) => void
}

function Volume({ onChange }: VolumeProps) {
  return (
    <div id={styles.volumeWrapper}>
      <input
        id={styles.volumeSlider}
        type='range'
        onChange={(e) => onChange(e.target.value)}
        min='0'
        max='1'
        step='0.01'
      />
    </div>
  );
}

type Props = {
  mp3: Blob
}

function Track({ mp3 }: Props) {
  const [wavesurfer, setWavesurfer] = useState(undefined as any as WaveSurfer);
  const [isLoaded, setLoaded] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const width = useWindowWidth();

  if (isLoaded) {
    if (width < 768) {
      wavesurfer.setHeight(100);
    } else if (width < 992) {
      wavesurfer.setHeight(120);
    } else {
      wavesurfer.setHeight(140);
    }
  }

  function formatSeconds(time: number) {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function updateCurrentTime(wave: WaveSurfer) {
    const current = formatSeconds(wave.getCurrentTime());
    setCurrentTime(current);
  }

  function playPause() {
    wavesurfer.playPause();
    setPlaying(wavesurfer.isPlaying());
  }

  function handleVolumeChange(volume: string) {
    wavesurfer.setVolume(Number(volume));
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
      hideScrollbar: true,
    });
    wave.loadBlob(mp3);
    wave.on('ready', () => {
      setCurrentTime('0:00');
      setLoaded(true);
    });
    wave.on('audioprocess', () => {
      updateCurrentTime(wave);
    });
    wave.on('interaction', () => {
      updateCurrentTime(wave);
    });
    wave.on('finish', () => {
      setPlaying(false);
    });
    setWavesurfer(wave);
  }, []);

  return (
    <div id={styles.track} className={styles.blue}>
      {isLoaded && (
        <div className={styles.trackLHS} id={styles.playWrapper}>
          <PlayButton onClick={playPause} isPlaying={isPlaying} />
        </div>
      )}
      <div id='waveform' className={styles.waveform} />
      {isLoaded && (
        <div className={styles.trackRHS}>
          <Progress currentTime={currentTime} />
          <Volume onChange={handleVolumeChange} />
        </div>
      )}
    </div>
  );
}

export default Track;
