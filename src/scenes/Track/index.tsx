import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import TrackContent from './components/TrackContent';
import { TrackProvider } from './index.state';
import Page from 'src/components/Page';
import { useMP3 } from 'src/context/mp3/index';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/firebase';

type TrackPageProps = {
  match: MatchType<{ id: string }>;
};

export default function TrackPage({ match }: TrackPageProps) {
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(true);
  const { mp3, setMP3 } = useMP3();

  const { id } = match.params;

  const setFormattedTitle = (newTitle: string) =>
    setTitle(`${newTitle} - wippy`);

  const getMP3 = () => {
    storage
      .ref(`${id}.mp3`)
      .getDownloadURL()
      .then((url) => {
        setFormattedTitle('Example Title');
        setLoading(false);
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => setMP3(blob as File))
          .catch((err) => console.log(err));
      })
      .catch(() => {
        setExists(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!mp3) getMP3();
    else setLoading(false);
  }, []);

  return (
    <>
      {!loading && !exists && <ErrorPage />}
      {!loading && exists && (
        <Page>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <TrackProvider>
            <TrackContent />
          </TrackProvider>
        </Page>
      )}
    </>
  );
}
