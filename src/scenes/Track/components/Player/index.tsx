import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import WaveSurfer from 'wavesurfer.js';

import styles from './index.module.scss';
import pause from './pause.svg';
import play from './play.svg';
import { useMP3 } from 'src/context/mp3/index';
import { useScreen } from 'src/context/screen';

type PlayButtonProps = {
  onClick: () => void;
  isPlaying: boolean;
};

function PlayButton({ onClick, isPlaying }: PlayButtonProps) {
  return (
    <button type="button" className={styles.playButton} onClick={onClick}>
      {!isPlaying && <img className={styles.icon} alt="Play Icon" src={play} />}
      {isPlaying && (
        <img className={styles.icon} alt="Pause Icon" src={pause} />
      )}
    </button>
  );
}

type ProgressProps = {
  currentTime: string;
};

function Progress({ currentTime }: ProgressProps) {
  return <p className={styles.progressTime}>{currentTime}</p>;
}

type PlayerProps = {
  theme: string;
};

export default function Player({ theme }: PlayerProps) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>(undefined as any);
  const [isLoaded, setLoaded] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { breakpoint, isWindow } = useScreen();
  const { mp3 } = useMP3();

  const MOBILE_HEIGHT = 100;
  const TABLET_HEIGHT = 120;
  const DESKTOP_HEIGHT = 140;

  const formatTrackTime = (time: number) => {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const updateCurrentTime = (wave: WaveSurfer) => {
    const current = formatTrackTime(wave.getCurrentTime());
    setCurrentTime(current);
  };

  const playPause = () => {
    wavesurfer.playPause();
    setPlaying(wavesurfer.isPlaying());
  };

  // const handleVolumeChange = (volume: number) => {
  //   wavesurfer.setVolume(volume);
  // };

  useEffect(() => {
    if (isLoaded) {
      if (isWindow('M')) wavesurfer.setHeight(MOBILE_HEIGHT);
      else if (isWindow('T')) wavesurfer.setHeight(TABLET_HEIGHT);
      else wavesurfer.setHeight(DESKTOP_HEIGHT);
    }
  }, [isLoaded, breakpoint]);

  useEffect(() => {
    if (mp3) {
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
        height: 140,
      });
      wave.loadBlob(mp3);
      wave.on('ready', () => setCurrentTime('0:00'));
      wave.on('audioprocess', () => updateCurrentTime(wave));
      wave.on('interaction', () => updateCurrentTime(wave));
      wave.on('finish', () => setPlaying(false));
      setWavesurfer(wave);
      setLoaded(true);
    }
  }, [mp3]);

  return (
    <div className={cn(styles.track, styles[theme])}>
      {isLoaded && (
        <div className={cn(styles.trackLHS, styles.playContainer)}>
          <PlayButton onClick={playPause} isPlaying={isPlaying} />
        </div>
      )}
      <div className={styles.waveformContainer}>
        <div id="waveform" className={styles.waveform}>
          {!isLoaded && <p className={styles.loadingText}>loading...</p>}
        </div>
      </div>
      {isLoaded && (
        <div className={styles.trackRHS}>
          <Progress currentTime={currentTime} />
        </div>
      )}
      <KeyboardEventHandler
        handleKeys={['space']}
        onKeyEvent={() => playPause()}
      />
    </div>
  );
}
