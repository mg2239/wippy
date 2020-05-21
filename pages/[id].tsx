import React from 'react';
import { useRouter } from 'next/router';
import Page from '../components/Page/Page';

const Track = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Page>
      <div className="container">
        <p>{`Track: ${id}`}</p>
      </div>
    </Page>
  );
};

export default Track;
