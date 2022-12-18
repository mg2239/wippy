import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useRef, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { throttle } from 'throttle-debounce';
import WaveSurfer from 'wavesurfer.js';
import { UploadContext } from '../../context/UploadContext';

type Props = {
  url?: string;
};

export const Player = ({ url }: Props) => {
  const { file } = useContext(UploadContext);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const totalTime = useRef('0:00');
  const firstRender = useRef(false);

  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying((prev) => !prev);
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
    <div>
      <div id="waveform" className="relative mb-2">
        <ScaleLoader
          color="#F43F5E"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          loading={!wavesurfer}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="p-1 text-rose-500 transition-colors hover:bg-slate-700"
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        {currentTime && (
          <p className="font-medium">
            {currentTime} / {totalTime.current}
          </p>
        )}
      </div>
    </div>
  );
};
