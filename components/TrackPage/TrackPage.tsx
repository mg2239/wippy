import React from 'react';

type Props = {
  trackID: string
}

export default function TrackPage({ trackID }: Props) {
  return (
    <div>
      <p>{`Track: ${trackID}`}</p>
    </div>
  );
}
