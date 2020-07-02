import React from 'react';

type Props = {
  title: string;
  desc: string;
  expireType: string;
  expireValue: string;
};

function TrackInfo({ title, desc, expireType, expireValue }: Props) {
  return (
    <div>
      <p>{title}</p>
      <p>{desc}</p>
      <p>{`expires: ${expireValue} ${expireType}`}</p>
    </div>
  );
}

export default TrackInfo;
