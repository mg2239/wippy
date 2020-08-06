import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { match as MatchType } from 'react-router-dom';

import Player from './components/Player';
import styles from './index.module.scss';
import { useTrack } from './index.state';
import Page from 'src/components/Page';
import { useUpload } from 'src/context/upload';
import ErrorPage from 'src/scenes/404';
import { storage } from 'src/util/initFirebase';

type Props = {
  mp3: File | undefined;
};

function Track({ mp3 }: Props) {
  const { bgColor } = useTrack();
  const { isNew } = useUpload();

  console.log(isNew);

  return (
    <div id={styles.container}>
      <Player mp3={mp3} bgColor={bgColor} />
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

  useEffect(() => {
    if (id) {
      storage
        .ref(`${id}.mp3`)
        .getDownloadURL()
        .then((url) => {
          setLoading(false);
          setFormattedTitle('Example Title');
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              setMp3(blob as File);
            })
            .catch((err) => console.log(err));
        })
        .catch(() => {
          setDNE(true);
          setLoading(false);
        });
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
