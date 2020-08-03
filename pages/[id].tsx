import Head from 'next/head';
import { useRouter } from 'next/router';
import Blob from 'node-blob';
import React, { useState, useEffect } from 'react';

import Page from '@components/Page';
import Page404 from '@scenes/404';
import Track from '@scenes/Track';
import { storage } from '@util/initFirebase';

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
            .catch((err) => console.log(err));
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

export default TrackPage;
