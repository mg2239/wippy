import React from 'react';
import { useRouter } from 'next/router';

const Track = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <p>{`Track: ${id}`}</p>
  );
};

export default Track;
