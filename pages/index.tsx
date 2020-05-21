import React from 'react';
import Page from '../components/Page/Page';
import Upload from '../components/Upload/Upload';
import LandingText from '../components/LandingText/LandingText';

export default function Home() {
  function handleUpload() {
    return 1;
  }

  return (
    <Page>
      <div className='container'>
        <LandingText />
        <Upload onUpload={handleUpload} />
      </div>
    </Page>
  );
}
