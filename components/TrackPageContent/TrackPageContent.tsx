import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Track from '../Track/Track';

type Props = {
  trackID: string
}

export default function TrackPageContent({ trackID }: Props) {
  return (
    <div>
      <p>{`Track: ${trackID}`}</p>
      <Track src={src} />
    </div>
  );
}