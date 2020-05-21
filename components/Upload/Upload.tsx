import React from 'react';

type Props = {
  onUpload: () => number
}

export default function Upload({ onUpload }: Props) {
  return <p>{onUpload()}</p>;
}
