import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import TrackContent from './components/TrackContent';
import { TrackProvider } from './index.state';
import Page from 'src/components/Page';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/firebase';

type TrackPageProps = {
  match: MatchType<{ id: string }>;
};

export default function TrackPage({ match }: TrackPageProps) {
  const [title, setTitle] = useState<string>();
  const [mp3, setMp3] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [DNE, setDNE] = useState(false);

  const { id } = match.params;

  const setFormattedTitle = (newTitle: string) =>
    setTitle(`${newTitle} - wippy`);

  const getMp3 = () => {
    storage
      .ref(`${id}.mp3`)
      .getDownloadURL()
      .then((url) => {
        setFormattedTitle('Example Title');
        setLoading(false);
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => setMp3(blob as File))
          .catch((err) => console.log(err));
      })
      .catch(() => {
        setDNE(true);
        setLoading(false);
      });
  };

  useEffect(() => getMp3(), []);

  return (
    <>
      {!loading && DNE && <ErrorPage />}
      {!loading && !DNE && (
        <Page>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <TrackProvider>
            <TrackContent mp3={mp3} />
          </TrackProvider>
        </Page>
      )}
    </>
  );
}
