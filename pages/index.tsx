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
      <>
        <div id='home'>
          <div id='homeInner'>
            <LandingText />
            <Upload onUpload={handleUpload} />
          </div>
        </div>
        <style jsx>{`
        #home {
          flex: 1 0 auto;
          min-height: auto;
          margin: 0 2rem;
        }

        #homeInner {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
      `}</style>
      </>
    </Page>
  );
}
