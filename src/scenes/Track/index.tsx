import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import Player from './components/Player';
import TrackEdit from './components/TrackEdit';
import TrackInfo from './components/TrackInfo';
import styles from './index.module.scss';
import { TrackProvider, useTrack } from './index.state';
import Page from 'src/components/Page';
import { useMP3 } from 'src/context/mp3';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/firebase';

type TrackPageProps = {
  id: string;
};

function TrackPage({ id }: TrackPageProps) {
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(true);
  const { mp3, isNew, setMP3 } = useMP3();
  const { title, theme, setId } = useTrack();

  const pageTitle = title.length ? `${title} - wippy` : 'wippy';

  const getMP3 = () => {
    storage
      .ref(`${id}.mp3`)
      .getDownloadURL()
      .then((url) => {
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
            <title>{pageTitle}</title>
          </Helmet>
          <div className={styles.container}>
            {isNew && <TrackEdit />}
            <Player theme={theme} />
            <TrackInfo />
          </div>
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
