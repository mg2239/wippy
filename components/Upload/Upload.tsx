import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './upload.module.scss';

type Props = {
  onUpload: () => void
}

function InfoText() {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>click to upload audio</p>
      <p id={styles.subtext}>or drag and drop your file here</p>
      <p id={styles.files}>mp3, wav, and flac ok</p>
    </div>
  );
}

function UploadText() {
  return (
    <div id={styles.textContainer}>
      <p id={styles.main}>uploading...</p>
    </div>
  );
}

export default function Upload({ onUpload }: Props) {
  const [accepted, setAccepted] = useState(false);
  function onDropAccepted(acceptedFiles: any) {
    onUpload();
    setAccepted(true);
    console.log(acceptedFiles);
  }
  function onDropRejected() {
    console.log('incorrect');
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: ['.mp3', '.wav', '.flac', '.ogg'],
  });
  return (
    <>
      {!accepted && (
        <div {...getRootProps({
          id: styles.infoContainer,
        })}>
          <input {...getInputProps()} />
          <InfoText />
        </div >
      )}
      {accepted && (
        <div id={styles.uploadContainer}>
          <UploadText />
        </div>
      )}
    </>
  );
}
