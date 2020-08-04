import Blob from 'node-blob';
import React, { useState, useEffect } from 'react';

import Player from './components/Player';
import styles from './index.module.scss';
import { useTrack } from './index.state';
import Page from 'src/components/Page';
import { useUpload } from 'src/context/upload';
import Page404 from 'src/scenes/404';
import { storage } from 'src/util/initFirebase';

type Props = {
  mp3: File;
};

export default function Track({ mp3 }: Props) {
  const { bgColor } = useTrack();
  const { isNew } = useUpload();

  console.log(isNew);

  return (
    <div id={styles.container}>
      <Player mp3={mp3} bgColor={bgColor} />
    </div>
  );
}

function TrackPage() {
  const [title, setTitle] = useState('wippy');
  const [mp3, setMp3] = useState(new Blob());
  const [loading, setLoading] = useState(true);
  const [DNE, setDNE] = useState(false);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      storage
        .ref(`${id}.mp3`)
        .getDownloadURL()
        .then((url) => {
          setLoading(false);
          setTitle('Example Title - wippy');
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              setMp3(blob);
            })
            .catch(() => {});
        })
        .catch(() => {
          setLoading(false);
          setTitle('404 - wippy');
          setDNE(true);
        });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!loading && DNE && <Page404 />}
      {!loading && !DNE && (
        <Page>
          <Track mp3={mp3} />
        </Page>
      )}
    </>
  );
}
