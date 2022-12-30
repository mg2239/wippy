import { useContext, useEffect, useRef, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ScaleLoader } from 'react-spinners';
import { throttle } from 'throttle-debounce';
import WaveSurfer from 'wavesurfer.js';
import { UploadContext } from '../../context/UploadContext';
import { Button } from '../Button';

type Props = {
  url?: string;
};

export const Player = ({ url }: Props) => {
  const { file } = useContext(UploadContext);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState('');
  const totalTime = useRef('0:00');
  const firstRender = useRef(false);

  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleMute = () => {
    if (wavesurfer) {
      wavesurfer.toggleMute();
      setIsMuted((prev) => !prev);
    }
  };

  const changeVolume = (value: number) => {
    if (wavesurfer) {
      if (isMuted || !value) {
        toggleMute();
      }
      wavesurfer.setVolume(value);
      setVolume(value);
    }
  };

  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;

    const _wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#F43F5Eaa',
      progressColor: '#F43F5E',
      responsive: true,
      barGap: 2,
      barMinHeight: 1,
      barWidth: 2,
      barRadius: 1,
      cursorWidth: 0,
      hideScrollbar: true,
      height: 140,
    });

    const formatTrackTime = (time: number) => {
      const sec = Math.floor(time % 60);
      const min = Math.floor(time / 60);
      return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const updateCurrentTime = throttle(100, () => {
      const newTime = formatTrackTime(_wavesurfer.getCurrentTime());
      setCurrentTime(newTime);
    });

    _wavesurfer.load(url || URL.createObjectURL(file!));
    _wavesurfer.on('ready', () => {
      setWavesurfer(_wavesurfer);
      setCurrentTime('0:00');
      totalTime.current = formatTrackTime(_wavesurfer.getDuration());
    });
    _wavesurfer.on('audioprocess', updateCurrentTime);
    _wavesurfer.on('seek', updateCurrentTime);
    _wavesurfer.on('finish', () => setIsPlaying(false));
  }, []);

  return (
    <>
      <KeyboardEventHandler handleKeys={['space']} onKeyEvent={togglePlay} />
      <div id="waveform" className="relative mb-2">
        <ScaleLoader
          color="#F43F5E"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          loading={!wavesurfer}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            icon={isPlaying ? 'PauseIcon' : 'PlayIcon'}
            onClick={togglePlay}
          />
          <div
            className="flex gap-3"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <Button
              icon={isMuted ? 'SpeakerXMarkIcon' : 'SpeakerWaveIcon'}
              onClick={toggleMute}
            />
            {showVolume && (
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
              />
            )}
          </div>
        </div>
        {currentTime && (
          <p className="font-medium">
            {currentTime} / {totalTime.current}
          </p>
        )}
      </div>
    </>
  );
};
