import React from 'react';
import { useRouter } from 'next/router';
import Page from '../components/Page/Page';

export default function Track() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Page>
      <div className="container">
        <p>{`Track: ${id}`}</p>
      </div>
    </Page>
  );
}
