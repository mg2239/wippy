import React, { useState } from 'react';
import Page from '../components/Page/Page';
import Upload from '../components/Upload/Upload';
import LandingText from '../components/LandingText/LandingText';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  function handleUpload() {
    setUploaded(true);
  }
  return (
    <Page>
      <>
        <div id='home'>
          <div id='homeInner'>
            {!uploaded && <LandingText />}
            <Upload onUpload={handleUpload} />
          </div>
        </div>
      </>
    </Page>
  );
}
