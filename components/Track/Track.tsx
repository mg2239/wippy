import React from 'react';
import WaveSurfer from 'wavesurfer.js';

type Props = {
  src: string
}

export default function Track({ src }: Props) {
  return (
    <div id='waveform'>
      <audio controls src={src}>
      </audio>
    </div>
  );
}
