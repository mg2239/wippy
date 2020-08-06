import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import Player from './components/Player';
import TrackEdit from './components/TrackEdit';
import TrackInfo from './components/TrackInfo';
import styles from './index.module.scss';
import { useTrack } from './index.state';
import Page from 'src/components/Page';
import { useUpload } from 'src/context/upload';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/firebase';

type Props = {
  mp3: File | undefined;
};

function Track({ mp3 }: Props) {
  const { bgColor } = useTrack();
  const { isNew } = useUpload();

  return (
    <div id={styles.container}>
      {isNew && <TrackEdit />}
      <Player mp3={mp3} bgColor={bgColor} />
      <TrackInfo />
    </div>
  );
}

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

  useEffect(() => {
    if (id) {
      getMp3();
    }
  }, [id]);

  return (
    <>
      {!loading && DNE && <ErrorPage />}
      {!loading && !DNE && (
        <Page>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <Track mp3={mp3} />
        </Page>
      )}
    </>
  );
}
