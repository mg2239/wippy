import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'react-stores';
import Upload from '../Upload/Upload';
import LandingText from '../LandingText/LandingText';
import styles from './homepagecontent.module.scss';

type FileStoreType = {
  mp3?: File;
}

export const fileStore = new Store<FileStoreType>({});

export default function HomePageContent() {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  function handleUpload() {
    setUploaded(true);
  }
  function handleSuccess(mp3: File, id: string) {
    fileStore.setState({ mp3 });
    router.push(`/${id}`);
  }
  return (
    <div id={styles.home}>
      <div id={styles.homeInner}>
        {!uploaded && <LandingText />}
        <Upload onUpload={handleUpload} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
