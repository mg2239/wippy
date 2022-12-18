import { useContext, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { UploadContext } from '../../context/UploadContext';

type Props = {
  url?: string;
};

export const Player = ({ url }: Props) => {
  const { file } = useContext(UploadContext);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;

    const _wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#000000aa',
      progressColor: '#000000',
      responsive: true,
      barGap: 2,
      barMinHeight: 1,
      barWidth: 2,
      barRadius: 1,
      cursorWidth: 0,
      hideScrollbar: true,
      height: 140,
    });

    _wavesurfer.load(url || URL.createObjectURL(file!));

    setWavesurfer(_wavesurfer);
  }, []);

  return (
    <div>
      <div id="waveform" />
    </div>
  );
};
