import React, { useEffect } from 'react';
import * as WaveSurfer from './wavesurfer';

export default function Chat() {
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
    });
  }, []);

  return (
    <div id='waveform'>
    </div>
  );
}
