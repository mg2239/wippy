import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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

// type VolumeProps = {
//   onChange: (volume: string) => void
// }

// function Volume({ onChange }: VolumeProps) {
//   return (
//     <div id={styles.volumeWrapper}>
//       <input
//         id={styles.volumeSlider}
//         type='range'
//         onChange={(e) => onChange(e.target.value)}
//         min='0'
//         max='1'
//         step='0.01'
//       />
//     </div>
//   );
// }

type Props = {
  mp3: Blob
}

function Track({ mp3 }: Props) {
  const [wavesurfer, setWavesurfer] = useState(undefined as any as WaveSurfer);
  const [isLoaded, setLoaded] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const width = useWindowWidth();
  const mobile = 1024;
  const smMobile = 768;

  if (isLoaded) {
    if (width <= smMobile && wavesurfer.getHeight() !== 100) {
      wavesurfer.setHeight(100);
    } else if (width > smMobile && width <= mobile && wavesurfer.getHeight() !== 120) {
      wavesurfer.setHeight(120);
    } else if (width > mobile && wavesurfer.getHeight() !== 140) {
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

  // function handleVolumeChange(volume: string) {
  //   wavesurfer.setVolume(Number(volume));
  // }

  useEffect(() => {
    if (mp3.size !== 0) {
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
      wave.on('ready', () => {
        setCurrentTime('0:00');
        setReady(true);
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
      setLoaded(true);
    }
  }, [mp3]);

  return (
    <div id={styles.track} className={styles.black}>
      <div className={styles.trackLHS} id={styles.playWrapper}>
        {isReady && <PlayButton onClick={playPause} isPlaying={isPlaying} />}
      </div>
      <div id='waveform' className={styles.waveform}>
        {!isLoaded && <p id={styles.loadingText}>loading...</p>}
      </div>
      <div className={styles.trackRHS}>
        {isReady && (
          <>
            <Progress currentTime={currentTime} />
            {/* <Volume onChange={handleVolumeChange} /> */}
          </>
        )}
      </div>
      <KeyboardEventHandler handleKeys={['space']} onKeyEvent={() => playPause()} />
    </div>
  );
}

export default Track;
