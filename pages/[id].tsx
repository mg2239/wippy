import React from 'react';
import { useRouter } from 'next/router';
import Page from '../components/Page/Page';
import TrackPage from '../components/TrackPage/TrackPage';

export default function Track() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Page>
      <TrackPage trackID={id as string} />
    </Page>
  );
}
