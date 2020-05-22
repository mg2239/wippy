import React from 'react';

type Props = {
  trackID: string
}

export default function TrackPageContent({ trackID }: Props) {
  return (
    <div>
      <p>{`Track: ${trackID}`}</p>
    </div>
  );
}
