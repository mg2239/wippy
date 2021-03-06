import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import Player from './components/Player/Player';
import TrackEdit from './components/TrackEdit/TrackEdit';
import TrackInfo from './components/TrackInfo/TrackInfo';
import styles from './track.module.scss';
import { TrackProvider, useTrack } from './track.state';
import Page from 'src/components/Page/Page';
import { useMP3 } from 'src/context/mp3';
import ErrorPage from 'src/scenes/404/404';

type TrackPageProps = {
  id: string;
};

function TrackPage({ id }: TrackPageProps) {
  const { isNew } = useMP3();
  const { title, theme, loading, exists, setId } = useTrack();

  const pageTitle = title.length ? `${title} - wippy` : 'wippy';

  useEffect(() => setId(id), []);

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
