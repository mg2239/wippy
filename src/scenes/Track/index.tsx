import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import TrackContent from './components/TrackContent';
import { TrackProvider, useTrack } from './index.state';
import Page from 'src/components/Page';
import { useMP3 } from 'src/context/mp3/index';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/firebase';

type TrackPageProps = {
  id: string;
};

function TrackPage({ id }: TrackPageProps) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(true);
  const { mp3, setMP3 } = useMP3();
  const { setId } = useTrack();

  const setFormattedTitle = (newTitle: string) =>
    setTitle(`${newTitle} - wippy`);

  const getMP3 = () => {
    storage
      .ref(`${id}.mp3`)
      .getDownloadURL()
      .then((url) => {
        setFormattedTitle('untitled');
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => setMP3(blob as File))
          .catch((err) => console.log(err));
      })
      .catch(() => setExists(false))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setId(id);
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
          <TrackContent />
        </Page>
      )}
    </>
  );
}

type TrackPageWrapperProps = {
  match: MatchType<{ id: string }>;
};

export default ({ match }: TrackPageWrapperProps) => (
  <TrackProvider>
    <TrackPage id={match.params.id} />
  </TrackProvider>
);
